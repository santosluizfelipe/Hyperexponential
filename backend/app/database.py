from __future__ import annotations

import csv
import json
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / "data"
DB_PATH = ROOT / "backend" / "people_pay.db"


def connect(db_path: Path = DB_PATH) -> sqlite3.Connection:
    conn = sqlite3.connect(db_path, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db(db_path: Path = DB_PATH) -> None:
    conn = connect(db_path)
    try:
        conn.executescript(
            """
            DROP TABLE IF EXISTS proposals;
            DROP TABLE IF EXISTS performance_reviews;
            DROP TABLE IF EXISTS bands;
            DROP TABLE IF EXISTS employees;

            CREATE TABLE employees (
                employee_id TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                work_email TEXT NOT NULL UNIQUE,
                manager_email TEXT,
                level TEXT NOT NULL,
                job_family TEXT NOT NULL,
                team TEXT NOT NULL,
                location TEXT NOT NULL,
                salary INTEGER NOT NULL,
                currency TEXT NOT NULL,
                start_date TEXT NOT NULL
            );

            CREATE TABLE performance_reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                employee_name TEXT NOT NULL,
                employee_email TEXT,
                review_date TEXT NOT NULL,
                rating TEXT NOT NULL,
                notes TEXT NOT NULL,
                matched_employee_email TEXT,
                match_status TEXT NOT NULL,
                match_warning TEXT
            );

            CREATE TABLE bands (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                level TEXT NOT NULL,
                job_family TEXT NOT NULL,
                region TEXT NOT NULL,
                currency TEXT NOT NULL,
                min_salary INTEGER NOT NULL,
                mid_salary INTEGER NOT NULL,
                max_salary INTEGER NOT NULL,
                effective_from TEXT NOT NULL,
                effective_to TEXT
            );

            CREATE TABLE proposals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                employee_email TEXT NOT NULL,
                requester_email TEXT NOT NULL,
                current_salary INTEGER NOT NULL,
                current_level TEXT NOT NULL,
                new_salary INTEGER NOT NULL,
                level_change INTEGER NOT NULL,
                new_level TEXT,
                effective_date TEXT NOT NULL,
                justification TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'submitted',
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            """
        )
        seed(conn)
        conn.commit()
    finally:
        conn.close()


def seed(conn: sqlite3.Connection) -> None:
    employees = json.loads((DATA_DIR / "employees.json").read_text())
    bands_payload = json.loads((DATA_DIR / "bands.json").read_text())
    bands = bands_payload["bands"] if isinstance(bands_payload, dict) else bands_payload

    conn.executemany(
        """
        INSERT INTO employees (
            employee_id, full_name, work_email, manager_email, level, job_family,
            team, location, salary, currency, start_date
        ) VALUES (
            :employee_id, :full_name, :work_email, :manager_email, :level,
            :job_family, :team, :location, :salary, :currency, :start_date
        )
        """,
        employees,
    )
    conn.executemany(
        """
        INSERT INTO bands (
            level, job_family, region, currency, min_salary, mid_salary,
            max_salary, effective_from, effective_to
        ) VALUES (
            :level, :job_family, :region, :currency, :min, :mid, :max,
            :effective_from, :effective_to
        )
        """,
        bands,
    )

    email_to_employee = {row["work_email"]: row for row in employees}
    names: dict[str, list[dict]] = {}
    for employee in employees:
        names.setdefault(employee["full_name"], []).append(employee)

    reviews = []
    with (DATA_DIR / "performance.csv").open(newline="") as handle:
        for row in csv.DictReader(handle):
            email = (row.get("employee_email") or "").strip()
            name = row["employee_name"]
            matched_email = None
            match_status = "unmatched"
            warning = "No employee record matches this performance review."

            if email and email in email_to_employee:
                matched_email = email
                match_status = "matched"
                warning = None
            elif not email and len(names.get(name, [])) > 1:
                match_status = "ambiguous"
                warning = "Excluded: the review has no email and multiple employees share this name."
            elif not email:
                match_status = "unverified_name_only"
                warning = "Excluded: a name-only review cannot verify employee identity."
            elif email:
                match_status = "unmatched_email"
                warning = "Excluded: the review email does not match an employee record."

            reviews.append(
                {
                    **row,
                    "employee_email": email or None,
                    "matched_employee_email": matched_email,
                    "match_status": match_status,
                    "match_warning": warning,
                }
            )

    conn.executemany(
        """
        INSERT INTO performance_reviews (
            employee_name, employee_email, review_date, rating, notes,
            matched_employee_email, match_status, match_warning
        ) VALUES (
            :employee_name, :employee_email, :review_date, :rating, :notes,
            :matched_employee_email, :match_status, :match_warning
        )
        """,
        reviews,
    )


if __name__ == "__main__":
    init_db()
