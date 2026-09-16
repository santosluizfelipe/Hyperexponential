import type { ChangeEvent, FC } from "react";

import type { Employee } from "@/types/pay";
import { Header, ManagerPicker } from "@/components/ManagerHeader.styles";

type ManagerHeaderProps = {
  managers: Employee[];
  managerEmail: string;
  onManagerChange: (email: string) => void;
};

export const ManagerHeader: FC<ManagerHeaderProps> = ({ managers, managerEmail, onManagerChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => onManagerChange(event.target.value);

  return (
    <Header>
      <div>
        <h1>Pay proposals</h1>
        <p>Manager-side compensation context for Northwind Analytics.</p>
      </div>
      <ManagerPicker>
        Logged-in manager
        <select value={managerEmail} onChange={handleChange}>
          {managers.map((manager) => (
            <option key={manager.work_email} value={manager.work_email}>
              {manager.full_name}
            </option>
          ))}
        </select>
      </ManagerPicker>
    </Header>
  );
};
