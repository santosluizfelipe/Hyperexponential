# Access Control And Real Data Readiness

## Who Sees What

The prototype has one active role: manager. The selected manager can see salary, band and performance context only for employees in their direct or indirect reporting tree. The backend enforces this on employee detail and proposal creation; the frontend table is not the access-control boundary.

The approval step and Finance view are described by the brief but not built. In a fuller version, the requesting manager's manager would see proposals awaiting approval, including salary details needed to approve or reject. Finance would see only approved proposals and the salary fields needed to process them.

## What Is Deliberately Withheld

Managers cannot see employees outside their reporting tree. Ambiguous performance records are not attached to a person as if they were certain. Finance-wide views, approval queues, audit screens and admin screens are omitted to keep the take-home focused on the manager workflow.

## Before Real Salary Data

Before this touched real salary data, I would require real identity and role-based access control, audit logging for every salary and performance-note view, encrypted storage, secure secret management, and production database controls. Postgres would replace SQLite, with migrations, backups, monitoring and least-privilege database access.

I would also want a data reconciliation process before compensation decisions depend on this tool. That means stable employee IDs across systems, clear ownership for fixing mismatches, validated region and currency mapping, compensation policy rules, approval thresholds, exception handling, and a reviewed approach to using free-text performance notes.
