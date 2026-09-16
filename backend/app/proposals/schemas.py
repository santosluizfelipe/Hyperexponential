from typing import Optional

from pydantic import BaseModel, Field


class ProposalCreate(BaseModel):
    employee_email: str
    requester_email: str
    new_salary: int = Field(gt=0)
    level_change: bool = False
    new_level: Optional[str] = None
    effective_date: str = Field(min_length=1)
    justification: str = Field(min_length=5)
