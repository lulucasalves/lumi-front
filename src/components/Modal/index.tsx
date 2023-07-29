import React, { ReactNode, useEffect } from "react";
import { Close, ModalContent, ModalOverlay } from "./style";
import { BsX } from "react-icons/bs";

// Defina as propriedades do componente
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".modal-content")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <ModalOverlay>
          <ModalContent className="modal-content">
            <Close onClick={onClose}>
              <BsX size={24} />
            </Close>
            {children}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
