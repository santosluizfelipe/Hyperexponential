import sqlite3
from typing import Any


def create(conn: sqlite3.Connection, values: dict[str, Any]) -> dict[str, Any]:
    cursor = conn.execute(
        """
        INSERT INTO proposals (
            employee_email, requester_email, current_salary, current_level,
            new_salary, level_change, new_level, effective_date, justification
        ) VALUES (
            :employee_email, :requester_email, :current_salary, :current_level,
            :new_salary, :level_change, :new_level, :effective_date, :justification
        )
        """,
        values,
    )
    conn.commit()
    row = conn.execute("SELECT * FROM proposals WHERE id = ?", (cursor.lastrowid,)).fetchone()
    return dict(row)


def list_by_requester(conn: sqlite3.Connection, requester_email: str) -> list[dict[str, Any]]:
    rows = conn.execute(
        """
        SELECT p.*, e.full_name, e.currency
        FROM proposals p
        JOIN employees e ON e.work_email = p.employee_email
        WHERE p.requester_email = ?
        ORDER BY p.created_at DESC, p.id DESC
        """,
        (requester_email,),
    ).fetchall()
    return [dict(row) for row in rows]
