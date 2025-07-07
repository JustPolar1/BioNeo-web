import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function MyCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <section className="py-5 pr-5 gap-5">
      <div className="max-w-xs w-full">
        <Calendar
          onChange={setValue}
          value={value}
          locale="es-MX"
          className="!bg-[#dffff3] dark:!bg-[#003d26] !border-none rounded-xl p-2 shadow-md w-full text-xs !text-gray-800 dark:!text-gray-100"
        />
      </div>
    </section>
  );
}