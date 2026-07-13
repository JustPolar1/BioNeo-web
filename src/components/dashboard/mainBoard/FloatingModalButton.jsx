import { useState } from "react";
import Modal from "../../Modal";
import CircleButton from "../../BioDemo/Buttons";
import BioDemo from "../../BioDemo/BioDemo";

export default function FloatingModalButton({
  icon,
  children,
  className = "",
  title = "Abrir",
  ariaLabel = "Abrir modal",
  modalTitle,
  modalContent,
  buttonProps = {},
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CircleButton
        type="button"
        title={title}
        aria-label={ariaLabel}
        className={`fixed bottom-4 right-4 z-40 ${className}`.trim()}
        onClick={() => setIsOpen(true)}
        {...buttonProps}
      >
        {icon}
      </CircleButton>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-3">
          {modalTitle ? (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {modalTitle}
            </h2>
          ) : null}
          {children ?? modalContent ?? <BioDemo />}
        </div>
      </Modal>
    </>
  );
}
