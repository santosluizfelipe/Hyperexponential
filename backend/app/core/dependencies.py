from pathlib import Path

from backend.app.database import DB_PATH, connect, init_db


def get_db():
    if not Path(DB_PATH).exists():
        init_db()
    conn = connect()
    try:
        yield conn
    finally:
        conn.close()
