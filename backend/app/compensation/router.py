import sqlite3

from fastapi import APIRouter, Depends

from backend.app.compensation import service
from backend.app.core.dependencies import get_db

router = APIRouter(tags=["compensation"])


@router.get("/levels")
def get_levels(conn: sqlite3.Connection = Depends(get_db)):
    return service.get_levels(conn)
