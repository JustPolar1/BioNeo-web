import { useState } from "react";
import { BsCurrencyDollar, BsDropletFill, BsFillBarChartFill, BsPiggyBankFill } from "react-icons/bs";
import { PiPottedPlantDuotone } from "react-icons/pi";

import SummaryEntry from "./summary/SummaryEntry";
import PeriodChanger from "./statistics/PeriodChanger";
import Statistics from "./statistics/Statistics";
import StatisticsSensors from "./statistics/StatisticsSensors";

export default function MainBoard() {
    const [periodo, setPeriodo] = useState("mes");
    // Datos dummy para las estadísticas
    const gastosMes   = { labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], values: [150, 200, 180, 220] };
    const gastosSem4 = { labels: ['Semana 4', 'Semana 3', 'Semana 2', 'Semana 1'], values: [90, 120, 80, 100] };

    const { labels, values } = periodo === 'mes' ? gastosMes : gastosSem4;

    const sensoresLabels = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];

    const sensoresDatasets = [
    {
        label: 'Humedad (%)',
        data: [60, 55, 50, 48, 52, 58],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
    },
    {
        label: 'Temperatura (°C)',
        data: [18, 21, 27, 30, 26, 22],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
    },
    {
        label: 'Luminosidad (lux)',
        data: [100, 500, 800, 700, 400, 100],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.4,
        yAxisID: 'luxAxis',
    },
    ];

    return (
    <>
      <section className="flex justify-between w-full">
        <SummaryEntry icon={<BsFillBarChartFill size={40} />} title="Ganancias" value="21.79%" />
        <SummaryEntry icon={<BsPiggyBankFill size={40} />} title="Balance actual" value="$58,127.91" />
        <SummaryEntry icon={<BsDropletFill size={40} />} title="Agua ahorrada" value="117 litros" />
      </section>

      <section>
        <div className="flex justify-between items-center gap-5">
            <span className="text-[#2fba87]">
                <BsCurrencyDollar size={48}/>
            </span>
            <div className="flex flex-1 flex-col">
                <h1 className="text-[#2fba87] font-bold text-xl">Gastos realizados</h1>
                <p className="text-black dark:text-gray-200">Resumen global</p>
            </div>
            <PeriodChanger periodo={periodo} setPeriodo={setPeriodo} />
        </div>

        <Statistics periodo={periodo} labels={labels} values={values} />
      </section>

      <section>
        <div className="flex justify-between items-center gap-5">
            <span className="text-[#2fba87]">
                <PiPottedPlantDuotone size={48}/>
            </span>
            <div className="flex flex-1 flex-col">
                <h1 className="text-[#2fba87] font-bold text-xl">Estadísticas de tu planta</h1>
                <p className="text-black dark:text-gray-200">Resumen de cada sensor</p>
            </div>
        </div>
        <StatisticsSensors labels={sensoresLabels} datasets={sensoresDatasets} />
      </section>
    </>
  );
}
