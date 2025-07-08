import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../../../../firebaseConfig";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function agrupaPorDia(entries) {
  const map = {};
  entries.forEach(e => {
    const d = new Date(e.date?.toDate ? e.date.toDate() : e.date);
    const key = d.toISOString().slice(0, 10);
    if (!map[key]) map[key] = [];
    map[key].push(e);
  });
  return map;
}

export default function CalendarWithSummary() {
  const [value, setValue] = useState(new Date());
  const [entriesByDay, setEntriesByDay] = useState({});

  useEffect(() => {
    async function fetchAllEntries() {
      const db = getFirestore(app);
      const uid = localStorage.getItem("uid");
      if (!uid) return;
      const q = query(collection(db, "entries"), where("userId", "==", uid));
      const snap = await getDocs(q);
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setEntriesByDay(agrupaPorDia(all));
    }
    fetchAllEntries();
  }, []);

  function tileClassName({ date, view }) {
    if (view !== "month") return;
    const key = date.toISOString().slice(0, 10);
    const dayEntries = entriesByDay[key];
    if (!dayEntries || dayEntries.length === 0) return;
    let ventas = 0, compras = 0;
    dayEntries.forEach(e => {
      if (e.type === "venta") ventas += Number(e.amount) || 0;
      if (e.type === "compra") compras += Number(e.amount) || 0;
    });
    if (ventas > compras) return "calendar-green";
    if (compras > ventas) return "calendar-red";
    return;
  }

function tileContent({ date, view }) {
  if (view !== "month") return null;
  const key = date.toISOString().slice(0, 10);
  const entries = entriesByDay[key];
  if (!entries?.length) return null;

  const html = entries
    .map(e => `<strong>${e.description}</strong>: ${e.amount} <em>(${e.type})</em>`)
    .join("<br />");

  return (
    <div className="relative w-full h-full">
      <span
        className="absolute inset-0 cursor-pointer"
        data-tooltip-id="cal-tip"
        data-tooltip-html={html}
        title="Ver detalles"
      />
    </div>
  );
}


  return (
    <section className="pb-5 pr-5">
      <style>{`
        .calendar-green abbr { background: rgba(75, 192, 192, 0.7); border-radius: 50%; color: #fff; }
        .calendar-red abbr { background: rgba(255, 99, 132, 0.7); border-radius: 50%; color: #fff; }
      `}</style>

      <div className="max-w-xs w-full relative">
        <Calendar
          onChange={setValue}
          value={value}
          locale="es-MX"
          tileClassName={tileClassName}
          tileContent={tileContent}
          className="!bg-[#dffff3] dark:!bg-[#003d26] !border-none rounded-xl p-2 shadow-md w-full text-xs !text-gray-800 dark:!text-gray-100"
        />
      </div>

      <Tooltip
        id="cal-tip"
        place="top"
        clickable
        closeOnEsc
        closeOnScroll
      />
    </section>
  );
}
