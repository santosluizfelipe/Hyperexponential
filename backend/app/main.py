from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.app.compensation.router import router as compensation_router
from backend.app.core.exceptions import AccessDenied, ResourceNotFound
from backend.app.database import init_db
from backend.app.employees.router import router as employees_router
from backend.app.proposals.router import router as proposals_router


@asynccontextmanager
async def lifespan(_app: FastAPI):
    init_db()
    yield


app = FastAPI(title="People Pay Proposal Tool", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ResourceNotFound)
def resource_not_found(_request: Request, error: ResourceNotFound):
    return JSONResponse(status_code=404, content={"detail": str(error)})


@app.exception_handler(AccessDenied)
def access_denied(_request: Request, error: AccessDenied):
    return JSONResponse(status_code=403, content={"detail": str(error)})


@app.get("/health", tags=["health"])
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(employees_router)
app.include_router(compensation_router)
app.include_router(proposals_router)
