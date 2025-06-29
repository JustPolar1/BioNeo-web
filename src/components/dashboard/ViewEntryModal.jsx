import Modal from "../Modal";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { useState, useEffect, useRef } from "react";

export default function ViewEntryModal({ isOpen, entry, onClose, onDeleted, onEntryUpdated }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [editField, setEditField] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [localData, setLocalData] = useState(entry);
    const [hasChanges, setHasChanges] = useState(false);
    const savingRef = useRef(false);

    useEffect(() => {
        setLocalData(entry);
        setEditField(null);
        setIsEditing(false);
        setHasChanges(false);
    }, [entry]);

    useEffect(() => {
        if (!entry || !localData) return;
        const changed =
            entry.description !== localData.description ||
            entry.type !== localData.type ||
            String(entry.amount) !== String(localData.amount);
        setHasChanges(changed);
    }, [localData, entry]);

    useEffect(() => {
        if (!isOpen && hasChanges && entry && !savingRef.current) {
            savingRef.current = true;
            handleSave().then(() => {
                savingRef.current = false;
            });
        }
        // eslint-disable-next-line
    }, [isOpen]);

    async function handleDelete() {
        if (!entry?.id) return;
        setLoading(true);
        setError("");
        try {
            const db = getFirestore(app);
            await deleteDoc(doc(db, "entries", entry.id));
            setLoading(false);
            if (onDeleted) onDeleted(entry.id); // <-- aquí
            onClose();
        } catch (err) {
            setError("Error al eliminar el registro.");
            setLoading(false);
        }
    }

    async function handleSave() {
        if (!entry?.id || !hasChanges) return;
        setLoading(true);
        setError("");
        try {
            const db = getFirestore(app);
            await updateDoc(doc(db, "entries", entry.id), {
                description: localData.description,
                type: localData.type,
                amount: parseFloat(localData.amount),
            });
            setLoading(false);
            setHasChanges(false);
            setIsEditing(false);
            if (onEntryUpdated) {
                onEntryUpdated({ ...entry, ...localData });
            }
        } catch (err) {
            setError("Error al guardar los cambios.");
            setLoading(false);
        }
    }

    function handleFieldChange(field, value) {
        setLocalData(prev => ({ ...prev, [field]: value }));
    }

    function handleFieldBlur() {
        setEditField(null);
    }

    function handleModifyClick() {
        setIsEditing(true);
        setEditField(null); // Opcional: para evitar conflictos con edición individual
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {localData ? (
                <div className="flex flex-col gap-3 min-w-[220px]">
                    <h1 className="text-xl font-bold text-[#2fba87] mb-1">Detalles del registro</h1>
                    {/* Descripción */}
                    <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Descripción: </span>
                        {(isEditing || editField === "description") ? (
                            <input
                                className="bg-transparent border-b border-[#2fba87] focus:outline-none text-gray-800 dark:text-gray-300"
                                value={localData.description}
                                autoFocus={editField === "description"}
                                onChange={e => handleFieldChange("description", e.target.value)}
                                onBlur={handleFieldBlur}
                                onKeyDown={e => e.key === "Enter" && handleFieldBlur()}
                            />
                        ) : (
                            <span
                                className="text-gray-800 dark:text-gray-300 cursor-pointer"
                                onDoubleClick={() => setEditField("description")}
                                title="Doble clic para editar"
                            >
                                {localData.description}
                            </span>
                        )}
                    </div>
                    {/* Tipo */}
                    <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Tipo: </span>
                        {(isEditing || editField === "type") ? (
                            <select
                                className="bg-transparent border-b border-[#2fba87] focus:outline-none text-gray-800 dark:text-gray-300"
                                value={localData.type}
                                autoFocus={editField === "type"}
                                onChange={e => handleFieldChange("type", e.target.value)}
                                onBlur={handleFieldBlur}
                            >
                                <option value="venta">Venta</option>
                                <option value="compra">Compra</option>
                            </select>
                        ) : (
                            <span
                                className="text-gray-800 dark:text-gray-300 capitalize cursor-pointer"
                                onDoubleClick={() => setEditField("type")}
                                title="Doble clic para editar"
                            >
                                {localData.type}
                            </span>
                        )}
                    </div>
                    {/* Cantidad */}
                    <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Cantidad: </span>
                        {(isEditing || editField === "amount") ? (
                            <input
                                className="bg-transparent border-b border-[#2fba87] focus:outline-none text-gray-800 dark:text-gray-300"
                                type="number"
                                step="0.01"
                                value={localData.amount}
                                autoFocus={editField === "amount"}
                                onChange={e => handleFieldChange("amount", e.target.value)}
                                onBlur={handleFieldBlur}
                                onKeyDown={e => e.key === "Enter" && handleFieldBlur()}
                            />
                        ) : (
                            <span
                                className="text-gray-800 dark:text-gray-300 cursor-pointer"
                                onDoubleClick={() => setEditField("amount")}
                                title="Doble clic para editar"
                            >
                                ${localData.amount}
                            </span>
                        )}
                    </div>
                    {/* Fecha */}
                    {localData.date && (
                        <div>
                            <span className="font-semibold text-gray-700 dark:text-gray-200">Fecha: </span>
                            <span className="text-gray-800 dark:text-gray-300">
                                {localData.date.toDate ? localData.date.toDate().toLocaleString() : String(localData.date)}
                            </span>
                        </div>
                    )}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex gap-2 mt-3">
                        <button
                            className="flex-1 bg-[#2fba87] text-white rounded-lg py-1 font-semibold hover:bg-[#24996c] transition hover:cursor-pointer"
                            onClick={isEditing ? handleSave : handleModifyClick}
                            disabled={loading || (isEditing && !hasChanges)}
                            type="button"
                        >
                            {isEditing ? "Guardar cambios" : "Modificar"}
                        </button>
                        <button
                            className="flex-1 bg-red-500 text-white rounded-lg py-1 font-semibold hover:bg-red-600 transition hover:cursor-pointer"
                            onClick={handleDelete}
                            disabled={loading}
                            type="button"
                        >
                            {loading ? "Eliminando..." : "Eliminar"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[100px]">
                    <span className="text-gray-400 text-sm">Cargando...</span>
                </div>
            )}
        </Modal>
    );
}