from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_manager_only_sees_reporting_tree():
    managers = client.get("/managers").json()
    manager_email = next(manager["work_email"] for manager in managers if manager["full_name"] == "Priya Raghunathan")

    team = client.get("/team", params={"manager_email": manager_email}).json()

    assert team
    assert all(employee["work_email"] != manager_email for employee in team)
    assert any(employee["full_name"] == "Dev Sharma" for employee in team)
    assert all("salary" not in employee for employee in team)


def test_team_is_ordered_by_depth_then_name():
    team = client.get(
        "/team",
        params={"manager_email": "priya.raghunathan@northwind.example"},
    ).json()

    depths = [employee["depth"] for employee in team]
    assert depths == sorted(depths)

    for depth in set(depths):
        names = [employee["full_name"] for employee in team if employee["depth"] == depth]
        assert names == sorted(names, key=str.casefold)


def test_employee_outside_tree_is_forbidden():
    response = client.get(
        "/employees/dev.sharma@northwind.example",
        params={"manager_email": "joe.pemberton@northwind.example"},
    )

    assert response.status_code == 403


def test_missing_band_produces_warning():
    team = client.get("/team", params={"manager_email": "deandre.whitfield@northwind.example"}).json()
    marcus = next(employee for employee in team if employee["full_name"] == "Marcus Bell")

    codes = {warning["code"] for warning in marcus["warnings"]}
    assert "missing_band" in codes


def test_email_matched_reviews_are_returned():
    response = client.get(
        "/employees/aoife.lenihan@northwind.example",
        params={"manager_email": "dev.sharma@northwind.example"},
    )

    assert response.status_code == 200
    detail = response.json()
    assert len(detail["performance_reviews"]) == 2
    assert {review["match_status"] for review in detail["performance_reviews"]} == {"matched"}


def test_duplicate_name_without_email_is_flagged():
    response = client.get(
        "/employees/tom.fairbrother@northwind.example",
        params={"manager_email": "priya.raghunathan@northwind.example"},
    )

    assert response.status_code == 200
    detail = response.json()
    codes = {warning["code"] for warning in detail["warnings"]}
    assert "ambiguous_performance" in codes
    assert len(detail["performance_reviews"]) == 2
    assert {review["match_status"] for review in detail["performance_reviews"]} == {"matched"}


def test_review_with_unmatched_email_is_excluded():
    response = client.get(
        "/employees/piotr.zielinski@northwind.example",
        params={"manager_email": "marta.wisniewska@northwind.example"},
    )

    assert response.status_code == 200
    detail = response.json()
    assert detail["performance_reviews"] == []
    assert "ambiguous_performance" in {warning["code"] for warning in detail["warnings"]}


def test_proposal_requires_justification():
    response = client.post(
        "/proposals",
        json={
            "employee_email": "aoife.lenihan@northwind.example",
            "requester_email": "dev.sharma@northwind.example",
            "new_salary": 90000,
            "level_change": False,
            "effective_date": "2026-04-01",
            "justification": "",
        },
    )

    assert response.status_code == 422


def test_proposal_can_be_submitted_and_retrieved():
    payload = {
        "employee_email": "aoife.lenihan@northwind.example",
        "requester_email": "dev.sharma@northwind.example",
        "new_salary": 90000,
        "level_change": True,
        "new_level": "Director",
        "effective_date": "2026-04-01",
        "justification": "Consistent exceeding performance and expanded scope.",
    }

    created = client.post("/proposals", json=payload)
    assert created.status_code == 201
    assert created.json()["status"] == "submitted"

    proposals = client.get("/proposals", params={"manager_email": "dev.sharma@northwind.example"}).json()
    assert any(proposal["employee_email"] == payload["employee_email"] for proposal in proposals)
