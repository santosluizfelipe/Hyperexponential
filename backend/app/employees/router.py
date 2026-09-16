import sqlite3

from fastapi import APIRouter, Depends, Query

from backend.app.core.dependencies import get_db
from backend.app.employees import service

router = APIRouter(tags=["employees"])


@router.get("/managers")
def get_managers(conn: sqlite3.Connection = Depends(get_db)):
    return service.get_managers(conn)


@router.get("/me")
def get_me(manager_email: str = Query(...), conn: sqlite3.Connection = Depends(get_db)):
    return service.get_manager(conn, manager_email)


@router.get("/team")
def get_team(manager_email: str = Query(...), conn: sqlite3.Connection = Depends(get_db)):
    return service.get_team(conn, manager_email)


@router.get("/employees/{employee_email}")
def get_employee(
    employee_email: str,
    manager_email: str = Query(...),
    conn: sqlite3.Connection = Depends(get_db),
):
    return service.get_employee_detail(conn, manager_email, employee_email)
