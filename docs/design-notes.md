# Design Notes

## Product Shape

The prototype focuses on the manager side of the pay-change workflow. The goal is to help a manager make a defensible proposal without leaving the tool: who the employee is, where they sit in the organization, how their current salary compares with the current band, and what their recent performance history says.

The first screen is the working screen. There is no landing page and no login page. The logged-in manager is faked with a dropdown because the brief explicitly allows this, and because the time is better spent on data quality, access control and salary-context decisions.

## Screens

- Manager selector: chooses the fake logged-in manager and scopes all backend data.
- Team table: shows direct and indirect reports, current salary, level, team, location, band status and warning count.
- Employee detail: shows current salary, region, start date, manager email, salary-band position, confidently matched performance reviews and data warnings.
- Proposal form: captures new salary, optional level change, effective date and justification.
- Submitted proposals: confirms proposals were saved as `submitted`; approval is intentionally left out.

## Data Gaps And Assumptions

The three exports do not share a stable employee ID, so performance reviews are matched by email first and by name only when the name is unique. Duplicate-name matches without email are flagged as ambiguous and excluded from the confident performance history.

Salary bands are keyed by region, while employees have city and country. The prototype maps United Kingdom to UK, United States to US, and Poland to PL. It does not perform currency conversion.

The app surfaces data uncertainty rather than silently fixing it. Missing current bands, duplicate names, unresolved manager references, ambiguous performance reviews and out-of-band salaries appear as warnings in the UI.

## Pushback On The Brief

The People team request says managers should see current salaries across their whole team. That is useful context, but broad salary visibility is sensitive. I would want explicit agreement on whether "whole team" means direct reports only, the full management chain below them, or peer/department-level salary distributions.

I would also challenge showing raw performance notes alongside salary without review. Free-text notes may contain sensitive or biased language, so a production version should have controls around what notes are appropriate for compensation decisions.
