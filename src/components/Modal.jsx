import { BsX } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, children }) {
  const [show, setShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setShow(true), 10);
    } else if (shouldRender) {
      setShow(false);
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, shouldRender]);

  // Cerrar con ESC
  useEffect(() => {
    if (!shouldRender) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  // Manejar clic fuera del modal
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick} // <-- aquí
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl relative max-w-sm w-full transition-transform duration-300 transform"
        style={{ transform: show ? "scale(1)" : "scale(0.95)" }}
        onClick={e => e.stopPropagation()} // <-- evita que el clic dentro cierre el modal
      >
        {children}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white hover:cursor-pointer"
        >
          <BsX size={32} />
        </button>
      </div>
    </div>
  );
}