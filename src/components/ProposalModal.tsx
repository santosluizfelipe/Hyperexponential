import { useEffect } from "react";
import type { FC, MouseEvent } from "react";
import { X } from "lucide-react";

import { ProposalForm } from "@/components/ProposalForm";
import type { EmployeeDetail } from "@/types/pay";
import { Backdrop, CloseButton, Header, Modal } from "@/components/ProposalModal.styles";

type ProposalModalProps = {
  employee: EmployeeDetail;
  managerEmail: string;
  levels: string[];
  onClose: () => void;
};

export const ProposalModal: FC<ProposalModalProps> = ({
  employee,
  managerEmail,
  levels,
  onClose
}) => {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleSaved = () => {
    onClose();
  };

  return (
    <Backdrop onMouseDown={closeFromBackdrop}>
      <Modal role="dialog" aria-modal="true" aria-labelledby="proposal-modal-title">
        <Header>
          <div>
            <h2 id="proposal-modal-title">Create pay proposal</h2>
            <p>{employee.full_name} · {employee.level}</p>
          </div>
          <CloseButton type="button" onClick={onClose} aria-label="Close proposal" title="Close">
            <X size={20} />
          </CloseButton>
        </Header>
        <ProposalForm
          employee={employee}
          managerEmail={managerEmail}
          levels={levels}
          onSaved={handleSaved}
        />
      </Modal>
    </Backdrop>
  );
};
