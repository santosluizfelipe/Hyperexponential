from __future__ import annotations

import sqlite3
from typing import Any


def find_by_email(conn: sqlite3.Connection, email: str) -> dict[str, Any] | None:
    row = conn.execute("SELECT * FROM employees WHERE work_email = ?", (email,)).fetchone()
    return dict(row) if row else None


def exists(conn: sqlite3.Connection, email: str) -> bool:
    return conn.execute("SELECT 1 FROM employees WHERE work_email = ?", (email,)).fetchone() is not None


def list_managers(conn: sqlite3.Connection) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT DISTINCT m.*
        FROM employees m
        JOIN employees e ON e.manager_email = m.work_email
        ORDER BY m.full_name COLLATE NOCASE
        """
    ).fetchall()
    return [dict(row) for row in rows]


def list_reporting_tree(conn: sqlite3.Connection, manager_email: str) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        WITH RECURSIVE reports AS (
            SELECT *, 1 AS depth FROM employees WHERE manager_email = ?
            UNION ALL
            SELECT e.*, reports.depth + 1
            FROM employees e
            JOIN reports ON e.manager_email = reports.work_email
        )
        SELECT * FROM reports ORDER BY depth, full_name COLLATE NOCASE
        """,
        (manager_email,),
    ).fetchall()
    return [dict(row) for row in rows]


def count_by_name(conn: sqlite3.Connection, full_name: str) -> int:
    row = conn.execute(
        "SELECT COUNT(*) AS count FROM employees WHERE full_name = ?",
        (full_name,),
    ).fetchone()
    return row["count"]


def count_unverified_reviews(conn: sqlite3.Connection, full_name: str) -> int:
    row = conn.execute(
        """
        SELECT COUNT(*) AS count FROM performance_reviews
        WHERE employee_name = ? AND matched_employee_email IS NULL
        """,
        (full_name,),
    ).fetchone()
    return row["count"]


def list_verified_reviews(conn: sqlite3.Connection, employee_email: str) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT employee_name, employee_email, review_date, rating, notes, match_status, match_warning
        FROM performance_reviews
        WHERE matched_employee_email = ?
        ORDER BY review_date DESC
        """,
        (employee_email,),
    ).fetchall()
    return [dict(row) for row in rows]
