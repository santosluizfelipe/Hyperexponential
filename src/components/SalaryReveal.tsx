import { useEffect, useState } from "react";
import type { FC } from "react";
import { Eye, EyeOff } from "lucide-react";

import { money } from "@/lib/format";
import { RevealButton, SalaryRow, SalaryValue } from "@/components/SalaryReveal.styles";

type SalaryRevealProps = {
  amount: number;
  currency: string;
  employeeEmail: string;
};

export const SalaryReveal: FC<SalaryRevealProps> = ({ amount, currency, employeeEmail }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(false), [employeeEmail]);

  return (
    <SalaryRow>
      <SalaryValue aria-live="polite">{isVisible ? money(amount, currency) : "••••••"}</SalaryValue>
      <RevealButton
        type="button"
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={isVisible ? "Hide salary" : "Show salary"}
        title={isVisible ? "Hide salary" : "Show salary"}
      >
        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </RevealButton>
    </SalaryRow>
  );
};
