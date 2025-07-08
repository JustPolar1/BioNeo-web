import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../../../../firebaseConfig";

/**
 * Obtiene el balance total (ventas - compras) del usuario.
 * @param {string} uid - ID del usuario.
 * @returns {Promise<number>} Balance calculado.
 */
export async function getBalance(uid) {
  const db = getFirestore(app);
  const entriesRef = collection(db, "entries");
  const q = query(entriesRef, where("userId", "==", uid));
  const querySnap = await getDocs(q);

  let totalVentas = 0;
  let totalCompras = 0;

  querySnap.forEach(doc => {
    const data = doc.data();
    if (data.type === "venta") {
      totalVentas += Number(data.amount) || 0;
    } else if (data.type === "compra") {
      totalCompras += Number(data.amount) || 0;
    }
  });

  return totalVentas - totalCompras;
}

