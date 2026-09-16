import type { FC } from "react";
import { AlertTriangle } from "lucide-react";

import type { WarningItem } from "@/types/pay";
import { Badge } from "@/components/WarningBadge.styles";

type WarningBadgeProps = {
  warning: WarningItem;
};

export const WarningBadge: FC<WarningBadgeProps> = ({ warning }) => (
  <Badge className={warning.severity}>
    <AlertTriangle size={14} />
    {warning.message}
  </Badge>
);
