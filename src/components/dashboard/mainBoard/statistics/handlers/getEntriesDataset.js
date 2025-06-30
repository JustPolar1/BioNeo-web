import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../../../../../firebaseConfig";

const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export async function getEntriesDataset(uid, periodo = "mes") {
  const db = getFirestore(app);
  const entriesRef = collection(db, "entries");
  const q = query(entriesRef, where("userId", "==", uid));
  const querySnapshot = await getDocs(q);

  let labels = [];
  let ventas = [];
  let compras = [];

  if (periodo === "semana") {
    // Agrupa por día de la semana (últimos 7 días)
    const now = new Date();
    const dias = Array(7).fill(0).map((_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (6 - i));
      return d;
    });

    labels = dias.map(d => diasSemana[d.getDay()]);
    ventas = Array(7).fill(0);
    compras = Array(7).fill(0);

    querySnapshot.forEach(doc => {
      const data = doc.data();
      const date = data.date.toDate ? data.date.toDate() : new Date(data.date);
      // Solo entradas de los últimos 7 días
      dias.forEach((d, idx) => {
        if (
          date.getDate() === d.getDate() &&
          date.getMonth() === d.getMonth() &&
          date.getFullYear() === d.getFullYear()
        ) {
          if (data.type === "venta") ventas[idx] += data.amount;
          if (data.type === "compra") compras[idx] += data.amount;
        }
      });
    });
    compras = compras.map(v => -v); // Negativo para compras
  } else {
    // Agrupa por semana (últimas 4 semanas)
    const now = new Date();
    const semanas = [];
    for (let i = 3; i >= 0; i--) {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay() - (i * 7));
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      semanas.push({ start, end });
    }
    labels = semanas.map((s, idx) => {
      const weekNumber = getWeekNumber(s.start);
      return `Semana ${weekNumber}`;
    });
    ventas = Array(4).fill(0);
    compras = Array(4).fill(0);

    querySnapshot.forEach(doc => {
      const data = doc.data();
      const date = data.date.toDate ? data.date.toDate() : new Date(data.date);
      semanas.forEach((s, idx) => {
        if (date >= s.start && date <= s.end) {
          if (data.type === "venta") ventas[idx] += data.amount;
          if (data.type === "compra") compras[idx] += data.amount;
        }
      });
    });
    compras = compras.map(v => -v);
  }

  return {
    labels,
    valuesVentas: ventas,
    valuesCompras: compras,
  };
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}