import sqlite3

from fastapi import APIRouter, Depends, Query

from backend.app.core.dependencies import get_db
from backend.app.proposals import service
from backend.app.proposals.schemas import ProposalCreate

router = APIRouter(prefix="/proposals", tags=["proposals"])


@router.post("", status_code=201)
def create_proposal(payload: ProposalCreate, conn: sqlite3.Connection = Depends(get_db)):
    return service.submit(conn, payload)


@router.get("")
def get_proposals(manager_email: str = Query(...), conn: sqlite3.Connection = Depends(get_db)):
    return service.get_by_manager(conn, manager_email)
