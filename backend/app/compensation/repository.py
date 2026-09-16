from __future__ import annotations

import sqlite3
from typing import Any


def find_current_band(
    conn: sqlite3.Connection,
    *,
    level: str,
    job_family: str,
    region: str,
    currency: str,
) -> dict[str, Any] | None:
    row = conn.execute(
        """
        SELECT * FROM bands
        WHERE level = ? AND job_family = ? AND region = ? AND currency = ?
          AND effective_to IS NULL
        LIMIT 1
        """,
        (level, job_family, region, currency),
    ).fetchone()
    return dict(row) if row else None


def list_levels(conn: sqlite3.Connection) -> list[str]:
    rows = conn.execute("SELECT DISTINCT level FROM bands ORDER BY level").fetchall()
    return [row["level"] for row in rows]
