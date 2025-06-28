import React, { useState, useEffect } from "react";
import { BsCurrencyDollar, BsDropletFill, BsFillBarChartFill, BsPiggyBankFill } from "react-icons/bs";
import { PiPottedPlantDuotone } from "react-icons/pi";
import { getSensorsDataset } from "./statistics/handlers/getSensorsDataset";

import SummaryEntry from "./summary/SummaryEntry";
import PeriodChanger from "./statistics/PeriodChanger";
import Statistics from "./statistics/Statistics";
import StatisticsSensors from "./statistics/StatisticsSensors";

export default function MainBoard() {
  const [periodo, setPeriodo] = useState("mes");
  const [sensoresLabels, setSensoresLabels] = useState([]);
  const [sensoresDatasets, setSensoresDatasets] = useState([]);

  const gastosMes = { labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], values: [150, 200, 180, 220] };
  const gastosSem4 = { labels: ['Semana 4', 'Semana 3', 'Semana 2', 'Semana 1'], values: [90, 120, 80, 100] };
  const { labels, values } = periodo === 'mes' ? gastosMes : gastosSem4;

  useEffect(() => {
    async function cargarDatosSensores() {
      const { labels, datasets } = await getSensorsDataset();
      setSensoresLabels(labels);
      setSensoresDatasets(datasets);
    }
    cargarDatosSensores();
  }, []);

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
            <BsCurrencyDollar size={48} />
          </span>
          <div className="flex flex-1 flex-col">
            <h1 className="text-[#2fba87] font-bold text-xl">Gastos y ventas realizadas</h1>
            <p className="text-black dark:text-gray-200">Resumen global</p>
          </div>
          <PeriodChanger periodo={periodo} setPeriodo={setPeriodo} />
        </div>

        <Statistics periodo={periodo} labels={labels} values={values} />
      </section>

      <section>
        <div className="flex justify-between items-center gap-5">
          <span className="text-[#2fba87]">
            <PiPottedPlantDuotone size={48} />
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
