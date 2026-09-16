# People Pay Proposal Tool

A manager-side compensation proposal tool built with React, TypeScript, FastAPI and SQLite.

## Technology

- Frontend: Vite, React, TypeScript, Redux Toolkit Query and styled-components
- Backend: FastAPI with feature-based router, service and repository layers
- Database: SQLite

SQLite keeps the take-home project self-contained. A production version would use Postgres with migrations, backups, stronger operational controls and monitoring.

## Prerequisites

Install the following before running the project:

- Python 3.9 or newer
- Node.js 18 or newer
- npm

## Local Setup

Clone or open the project, then move into its root directory:

```bash
cd Hyperexponential
```

### 1. Start the backend

Create and activate a Python virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the backend dependencies:

```bash
python -m pip install -r backend/requirements.txt
```

Start FastAPI on port `8000`:

```bash
python -m uvicorn backend.app.main:app --reload --port 8000
```

Keep this terminal running. You can verify the backend at:

- Health check: `http://127.0.0.1:8000/health`
- Interactive API documentation: `http://127.0.0.1:8000/docs`

The backend automatically creates and seeds `backend/people_pay.db` from the files in `data/` when it starts. Restarting the backend resets the prototype database, including submitted proposals.

### 2. Start the frontend

Open a second terminal and return to the project root:

```bash
cd Hyperexponential
npm install
npm run dev
```

Keep this terminal running and open:

`http://127.0.0.1:5173`

Vite proxies frontend requests beginning with `/api` to the FastAPI server at `http://127.0.0.1:8000`.

## Run Tests

With the Python virtual environment active:

```bash
python -m pytest backend/tests
```

Check the frontend TypeScript and production build:

```bash
npm run build
```

## Troubleshooting

### Port 8000 is already in use

Another backend process is already using the port. Find it with:

```bash
lsof -nP -iTCP:8000 -sTCP:LISTEN
```

Stop the listed process or run the backend on a different port. If you change the backend port, also update the proxy target in `vite.config.ts`.

### Frontend cannot load data

Confirm that:

- FastAPI is running on `http://127.0.0.1:8000`.
- The `/health` endpoint returns `{"status":"ok"}`.
- The frontend was started from the project root.

### Reset the local data

Restart the FastAPI server. The startup process recreates and reseeds the SQLite database automatically.

## Demo Path

1. Pick a logged-in manager from the dropdown.
2. Select someone in their team table.
3. Reveal salary and expand salary-band information when needed.
4. Review verified performance history and data-quality warnings.
5. Submit a proposal with salary, effective date and justification.
6. Confirm it appears in Submitted proposals.

## Deliberately Out Of Scope

- Real authentication
- Login page
- Full approval/rejection workflow
- Finance dashboard
- Notifications
- Currency conversion
- Compensation policy engine
- Admin tooling
- Production deployment

## Notes

- [API design](API_DESIGN.md)
- [Product questions and future work](FUTURE_WORK.md)
- [Design notes](docs/design-notes.md)
- [Access control and real data readiness](docs/access-control-and-real-data.md)
