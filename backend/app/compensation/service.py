from __future__ import annotations

import sqlite3
from typing import Any

from backend.app.compensation import repository

COUNTRY_TO_REGION = {
    "United Kingdom": "UK",
    "United States": "US",
    "Poland": "PL",
}


def region_for_location(location: str) -> str | None:
    return COUNTRY_TO_REGION.get(location.split(",")[-1].strip())


def get_current_band(
    conn: sqlite3.Connection,
    employee: dict[str, Any],
    level: str | None = None,
) -> dict[str, Any] | None:
    region = region_for_location(employee["location"])
    if not region:
        return None
    return repository.find_current_band(
        conn,
        level=level or employee["level"],
        job_family=employee["job_family"],
        region=region,
        currency=employee["currency"],
    )


def calculate_salary_position(salary: int, band: dict[str, Any] | None) -> dict[str, Any] | None:
    if not band:
        return None
    if salary < band["min_salary"]:
        status = "below_band"
    elif salary > band["max_salary"]:
        status = "above_band"
    else:
        status = "within_band"
    spread = band["max_salary"] - band["min_salary"]
    return {
        "status": status,
        "percentile": round(((salary - band["min_salary"]) / spread) * 100, 1) if spread else None,
        "compa_ratio": round(salary / band["mid_salary"], 3) if band["mid_salary"] else None,
    }


def get_levels(conn: sqlite3.Connection) -> list[str]:
    return repository.list_levels(conn)
