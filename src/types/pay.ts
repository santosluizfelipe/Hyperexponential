export type WarningItem = {
  code: string;
  message: string;
  severity: "warning" | "critical";
};

export type Band = {
  min_salary: number;
  mid_salary: number;
  max_salary: number;
  currency: string;
  effective_from: string;
} | null;

export type SalaryPosition = {
  status: "below_band" | "within_band" | "above_band";
  percentile: number | null;
  compa_ratio: number | null;
} | null;

export type Employee = {
  employee_id: string;
  full_name: string;
  work_email: string;
  manager_email: string | null;
  level: string;
  job_family: string;
  team: string;
  location: string;
  region: string | null;
  salary: number;
  currency: string;
  start_date: string;
  band: Band;
  salary_position: SalaryPosition;
  warnings: WarningItem[];
  depth?: number;
};

export type Review = {
  review_date: string;
  rating: string;
  notes: string;
  match_status: string;
  match_warning: string | null;
};

export type EmployeeDetail = Employee & {
  performance_reviews: Review[];
};

export type TeamEmployee = Omit<Employee, "salary">;

export type Proposal = {
  id: number;
  employee_email: string;
  requester_email: string;
  full_name: string;
  currency: string;
  current_salary: number;
  current_level: string;
  new_salary: number;
  level_change: number;
  new_level: string | null;
  effective_date: string;
  justification: string;
  status: string;
  created_at: string;
};

export type ProposalCreate = {
  employee_email: string;
  requester_email: string;
  new_salary: number;
  level_change: boolean;
  new_level: string | null;
  effective_date: string;
  justification: string;
};
