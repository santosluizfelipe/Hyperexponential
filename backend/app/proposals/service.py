from __future__ import annotations

import sqlite3
from typing import Any

from backend.app.compensation.service import calculate_salary_position, get_current_band
from backend.app.core.exceptions import AccessDenied, ResourceNotFound
from backend.app.employees import repository as employee_repository
from backend.app.employees.service import is_in_reporting_tree
from backend.app.proposals import repository
from backend.app.proposals.schemas import ProposalCreate


def submit(conn: sqlite3.Connection, payload: ProposalCreate) -> dict[str, Any]:
    if not is_in_reporting_tree(conn, payload.requester_email, payload.employee_email):
        raise AccessDenied("Employee is outside this manager's reporting tree")
    employee = employee_repository.find_by_email(conn, payload.employee_email)
    if not employee:
        raise ResourceNotFound("Employee not found")

    target_level = payload.new_level if payload.level_change else None
    target_band = get_current_band(conn, employee, target_level)
    proposal = repository.create(conn, {
        "employee_email": payload.employee_email,
        "requester_email": payload.requester_email,
        "current_salary": employee["salary"],
        "current_level": employee["level"],
        "new_salary": payload.new_salary,
        "level_change": int(payload.level_change),
        "new_level": target_level,
        "effective_date": payload.effective_date,
        "justification": payload.justification.strip(),
    })
    return {
        **proposal,
        "proposal_band": target_band,
        "proposal_salary_position": calculate_salary_position(payload.new_salary, target_band),
    }


def get_by_manager(conn: sqlite3.Connection, manager_email: str) -> list[dict[str, Any]]:
    return repository.list_by_requester(conn, manager_email)
