import { useEffect, useState } from "react";
import type { FC } from "react";
import { ChevronDown, ChevronUp, CircleDollarSign } from "lucide-react";

import { BandMeter } from "@/components/BandMeter";
import { Disclosure, Label, Toggle, ToggleHint } from "@/components/BandDisclosure.styles";
import type { EmployeeDetail } from "@/types/pay";

type BandDisclosureProps = {
  employee: EmployeeDetail;
};

export const BandDisclosure: FC<BandDisclosureProps> = ({ employee }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => setIsExpanded(false), [employee.work_email]);

  return (
    <Disclosure>
      <Toggle
        type="button"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
        aria-controls="employee-band-details"
      >
        <Label><CircleDollarSign size={18} />Band position</Label>
        <ToggleHint>
          {isExpanded ? "Hide" : "Show"}
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </ToggleHint>
      </Toggle>
      {isExpanded && <div id="employee-band-details"><BandMeter employee={employee} /></div>}
    </Disclosure>
  );
};
