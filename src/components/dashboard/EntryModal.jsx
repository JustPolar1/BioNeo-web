import { useState } from "react";
import Modal from "../Modal";
import CreateEntry from "./buttons/CreateEntry";
import { BsPlusCircleFill } from "react-icons/bs";

export default function EntryModal({ isOpen, onClose }) {
  const [valor, setValor] = useState("");
  const [error, setError] = useState("");
  const regex = /^\d+(\.\d{0,2})?$/;

  function handleChange(e) {
    const nuevoValor = e.target.value;
    if (nuevoValor === "" || regex.test(nuevoValor)) {
      setValor(nuevoValor);
      setError("");
    } else {
      setError("Solo números positivos con hasta dos decimales");
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="flex flex-col gap-3">
        <h1 className="text-black dark:text-gray-200 text-lg">Nuevo registro</h1>
        <input 
          className="w-full dark:bg-[#003d26] bg-[#dffff3] p-2 rounded-full text-black dark:text-gray-400"
          placeholder="Descripción del registro"
        />
        <h2 className="text-black dark:text-gray-200">Detalles</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-2">
          <select 
            className="flex flex-1 dark:bg-[#003d26] bg-[#dffff3] p-2 rounded-full text-black dark:text-gray-400"
          >
            <option value="venta">Venta</option>
            <option value="gasto">Compra</option>
          </select>
          <div>
            <input
              type="text"
              step={0.01}
              inputMode="decimal"
              value={valor}
              onChange={handleChange}
              placeholder="Cantidad"
              className="flex w-full dark:bg-[#003d26] bg-[#dffff3] p-2 rounded-full text-black dark:text-gray-400"
            />
          </div>
        </div>
        <div className="w-3/4 m-auto mt-1">
          <CreateEntry>
            <BsPlusCircleFill color="#2fba87" size={32} />
            <h2 className="text-center m-auto text-[#2fba87]">Agregar registro</h2>
          </CreateEntry>
        </div>
      </form>
    </Modal>
  );
}