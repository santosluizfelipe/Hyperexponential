import { useEffect, useState } from "react";
import type { FC, FormEvent } from "react";
import { Send } from "lucide-react";

import { useCreateProposalMutation } from "@/api/payApi";
import type { EmployeeDetail } from "@/types/pay";
import { CheckboxField, Field, Form, FormStatus, InlineWarning } from "@/components/ProposalForm.styles";

type ProposalFormProps = {
  employee: EmployeeDetail;
  managerEmail: string;
  levels: string[];
  onSaved: () => void;
};

export const ProposalForm: FC<ProposalFormProps> = ({ employee, managerEmail, levels, onSaved }) => {
  const [newSalary, setNewSalary] = useState(employee.salary.toString());
  const [levelChange, setLevelChange] = useState(false);
  const [newLevel, setNewLevel] = useState(employee.level);
  const [effectiveDate, setEffectiveDate] = useState("2026-04-01");
  const [justification, setJustification] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [createProposal] = useCreateProposalMutation();
  const salaryNumber = Number(newSalary);
  const outsideBand = employee.band && salaryNumber
    ? salaryNumber < employee.band.min_salary || salaryNumber > employee.band.max_salary
    : false;

  useEffect(() => {
    setNewSalary(employee.salary.toString());
    setLevelChange(false);
    setNewLevel(employee.level);
    setJustification("");
    setStatus(null);
  }, [employee.work_email, employee.salary, employee.level]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("Saving proposal...");
    try {
      await createProposal({
        employee_email: employee.work_email,
        requester_email: managerEmail,
        new_salary: salaryNumber,
        level_change: levelChange,
        new_level: levelChange ? newLevel : null,
        effective_date: effectiveDate,
        justification
      }).unwrap();
    } catch {
      setStatus("Proposal was not saved. Check the required fields and access.");
      return;
    }
    setStatus("Proposal submitted.");
    setJustification("");
    onSaved();
  };

  return (
    <Form onSubmit={submit}>
      <Field>
        New salary
        <input value={newSalary} onChange={({ target }) => setNewSalary(target.value)} type="number" min="1" required />
      </Field>
      <CheckboxField>
        <input checked={levelChange} onChange={({ target }) => setLevelChange(target.checked)} type="checkbox" />
        Level is changing
      </CheckboxField>
      {levelChange && (
        <Field>
          New level
          <select value={newLevel} onChange={({ target }) => setNewLevel(target.value)}>
            {levels.map((level) => <option key={level}>{level}</option>)}
          </select>
        </Field>
      )}
      <Field>
        Effective date
        <input value={effectiveDate} onChange={({ target }) => setEffectiveDate(target.value)} type="date" required />
      </Field>
      <Field>
        Justification
        <textarea value={justification} onChange={({ target }) => setJustification(target.value)} minLength={5} required />
      </Field>
      {outsideBand && <InlineWarning>Proposed salary is outside the current band.</InlineWarning>}
      {!employee.band && <InlineWarning>No matching current band exists for this employee.</InlineWarning>}
      <button type="submit"><Send size={16} />Submit proposal</button>
      {status && <FormStatus>{status}</FormStatus>}
    </Form>
  );
};
