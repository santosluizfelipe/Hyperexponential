# API Design

The backend is a REST-style FastAPI service organized around three business areas: employees, compensation and proposals.

## Architecture

Each feature follows the same dependency direction:

```text
HTTP request
    ↓
Router
    ↓
Service
    ↓
Repository
    ↓
SQLite
```

- **Routers** define URLs, query parameters, request bodies and HTTP status codes.
- **Services** enforce authorization and business rules.
- **Repositories** own SQL queries and database row conversion.
- **Schemas** validate incoming request data.
- **Core** manages database connections and shared domain exceptions.

The backend is organized by feature:

```text
backend/app/
├── core/
├── employees/
├── compensation/
├── proposals/
├── database.py
└── main.py
```

## Employee API

### `GET /managers`

Returns employees who have at least one direct report. The frontend uses this endpoint to populate the fake logged-in manager selector.

Example response:

```json
[
  {
    "full_name": "Priya Raghunathan",
    "work_email": "priya.raghunathan@northwind.example"
  }
]
```

### `GET /me?manager_email=...`

Returns the selected fake manager's employee record.

- `200`: Manager found.
- `404`: Manager does not exist.

### `GET /team?manager_email=...`

Returns the manager's direct and indirect reports. The reporting tree is calculated recursively and ordered first by reporting depth and then alphabetically by employee name.

Salary is deliberately excluded from this response. Salary is returned only when an authorized manager selects an individual employee.

### `GET /employees/{employee_email}?manager_email=...`

Returns the selected employee's complete compensation context:

- Employee details
- Current salary
- Matching salary band
- Band position and compa-ratio
- Verified performance history
- Data-quality warnings

The service verifies that the employee belongs to the requesting manager's reporting tree.

- `200`: Employee detail returned.
- `403`: Employee is outside the manager's reporting tree.
- `404`: Employee does not exist.

The access check is enforced by the backend and does not rely on frontend filtering.

## Compensation API

### `GET /levels`

Returns the distinct levels available in the salary-band data. The frontend uses these values in the proposal form's new-level selector.

Example response:

```json
[
  "Analyst",
  "Manager",
  "Director"
]
```

Salary bands are matched using:

```text
level + job family + region + currency
```

Only current bands, where `effective_to` is `null`, are considered.

## Proposal API

### `POST /proposals`

Creates a pay proposal.

Example request:

```json
{
  "employee_email": "aoife.lenihan@northwind.example",
  "requester_email": "dev.sharma@northwind.example",
  "new_salary": 90000,
  "level_change": true,
  "new_level": "Director",
  "effective_date": "2026-10-01",
  "justification": "Expanded responsibilities and sustained performance."
}
```

Validation includes:

- Salary must be greater than zero.
- Effective date must be present.
- Justification must contain at least five characters.
- The employee must belong to the requester's reporting tree.

A successful request returns `201 Created` and stores the proposal with the status `submitted`.

The response also includes the proposed salary's position against the applicable band. This information is advisory because official pay-review policy and approval thresholds were not provided.

### `GET /proposals?manager_email=...`

Returns proposals submitted by the selected manager, ordered newest first.

The frontend uses RTK Query tags. Creating a proposal invalidates that manager's proposal tag and automatically refetches the proposal list.

## Error Format

API errors follow FastAPI's standard response shape:

```json
{
  "detail": "Employee is outside this manager's reporting tree"
}
```

The primary responses are:

- `ResourceNotFound` becomes HTTP `404`.
- `AccessDenied` becomes HTTP `403`.
- Pydantic request-validation failures become HTTP `422`.
- Successful proposal creation returns HTTP `201`.

## Authentication Assumption

The prototype does not implement real authentication. Manager identity is supplied through `manager_email` to support the take-home demonstration.

This is not sufficient for production because a caller could impersonate another manager. A production API would derive identity from a verified session or access token and would not trust a requester email supplied by the frontend.

## Data Import and Matching

The backend imports:

- `employees.json`
- `bands.json`
- `performance.csv`

Performance reviews are returned only when the review email exactly matches an employee email. Name-only reviews and reviews containing an unknown email are excluded rather than attached speculatively. The employee response includes a warning when related reviews were excluded.

Country values are mapped to compensation regions before salary-band matching:

- United Kingdom → UK
- United States → US
- Poland → PL

No currency conversion is performed.

## Database Lifecycle

SQLite is used to keep the prototype self-contained. The database is recreated and seeded from the source files when FastAPI starts, producing a predictable demonstration state.

Because startup recreates the database, submitted proposals are cleared after a backend restart. A production implementation would use Postgres and versioned migrations, and would preserve proposals and audit history across deployments.
