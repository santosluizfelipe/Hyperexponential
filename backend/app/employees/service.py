from __future__ import annotations

import sqlite3
from dataclasses import dataclass
from typing import Any

from backend.app.compensation.service import calculate_salary_position, get_current_band, region_for_location
from backend.app.core.exceptions import AccessDenied, ResourceNotFound
from backend.app.employees import repository


@dataclass(frozen=True)
class WarningItem:
    code: str
    message: str
    severity: str = "warning"

    def as_dict(self) -> dict[str, str]:
        return {"code": self.code, "message": self.message, "severity": self.severity}


def is_in_reporting_tree(conn: sqlite3.Connection, manager_email: str, employee_email: str) -> bool:
    return any(
        employee["work_email"] == employee_email
        for employee in repository.list_reporting_tree(conn, manager_email)
    )


def get_warnings(
    conn: sqlite3.Connection,
    employee: dict[str, Any],
    band: dict[str, Any] | None,
    position: dict[str, Any] | None,
) -> list[dict[str, str]]:
    warnings: list[WarningItem] = []
    if repository.count_by_name(conn, employee["full_name"]) > 1:
        warnings.append(WarningItem(
            "duplicate_name",
            "This name is shared by another employee; related records are matched by email only.",
        ))
    if employee["manager_email"] and not repository.exists(conn, employee["manager_email"]):
        warnings.append(WarningItem(
            "unresolved_manager",
            "The employee's manager email does not resolve to an employee record.",
        ))
    if not region_for_location(employee["location"]):
        warnings.append(WarningItem("unknown_region", "No region mapping exists for this employee's country."))
    if not band:
        warnings.append(WarningItem(
            "missing_band",
            "No current salary band matches level, job family, region and currency.",
            "critical",
        ))
    if position and position["status"] != "within_band":
        warnings.append(WarningItem(
            "out_of_band_salary",
            "Current salary sits outside the matching salary band.",
            "critical" if position["status"] == "above_band" else "warning",
        ))
    unverified = repository.count_unverified_reviews(conn, employee["full_name"])
    if unverified:
        warnings.append(WarningItem(
            "ambiguous_performance",
            f"{unverified} performance review(s) could not be verified by employee email and were excluded.",
        ))
    return [warning.as_dict() for warning in warnings]


def employee_summary(conn: sqlite3.Connection, employee: dict[str, Any]) -> dict[str, Any]:
    band = get_current_band(conn, employee)
    position = calculate_salary_position(employee["salary"], band)
    public_employee = {key: value for key, value in employee.items() if key != "salary"}
    return {
        **public_employee,
        "region": region_for_location(employee["location"]),
        "band": band,
        "salary_position": position,
        "warnings": get_warnings(conn, employee, band, position),
    }


def get_managers(conn: sqlite3.Connection) -> list[dict[str, Any]]:
    return repository.list_managers(conn)


def get_manager(conn: sqlite3.Connection, manager_email: str) -> dict[str, Any]:
    manager = repository.find_by_email(conn, manager_email)
    if not manager:
        raise ResourceNotFound("Manager not found")
    return manager


def get_team(conn: sqlite3.Connection, manager_email: str) -> list[dict[str, Any]]:
    get_manager(conn, manager_email)
    return [employee_summary(conn, employee) for employee in repository.list_reporting_tree(conn, manager_email)]


def get_employee_detail(
    conn: sqlite3.Connection,
    manager_email: str,
    employee_email: str,
) -> dict[str, Any]:
    if not is_in_reporting_tree(conn, manager_email, employee_email):
        raise AccessDenied("Employee is outside this manager's reporting tree")
    employee = repository.find_by_email(conn, employee_email)
    if not employee:
        raise ResourceNotFound("Employee not found")
    band = get_current_band(conn, employee)
    position = calculate_salary_position(employee["salary"], band)
    return {
        **employee,
        "region": region_for_location(employee["location"]),
        "band": band,
        "salary_position": position,
        "performance_reviews": repository.list_verified_reviews(conn, employee_email),
        "warnings": get_warnings(conn, employee, band, position),
    }
