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
      // Espera la duración de la transición antes de desmontar
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl relative max-w-sm w-full transition-transform duration-300 transform"
        style={{ transform: show ? "scale(1)" : "scale(0.95)" }}>
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