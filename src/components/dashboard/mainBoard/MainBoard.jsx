import React, { useState, useEffect } from "react";
import {
  BsCurrencyDollar,
  BsDropletFill,
  BsFillBarChartFill,
  BsPiggyBankFill,
  BsTagFill
} from "react-icons/bs";
import { PiPottedPlantDuotone } from "react-icons/pi";
import { getSensorsDataset } from "./statistics/handlers/getSensorsDataset";
import { getEntriesDataset } from "./statistics/handlers/getEntriesDataset";

import { getBalance } from "./summary/getBalance";
import SummaryEntry from "./summary/SummaryEntry";
import PeriodChanger from "./statistics/PeriodChanger";
import Statistics from "./statistics/Statistics";
import StatisticsSensors from "./statistics/StatisticsSensors";
import { getWeeklySales } from "./summary/getWeeklySales";
import { getWeeklyPurchases } from "./summary/getWeeklyPurchases";

export default function MainBoard() {
  const [periodo, setPeriodo] = useState("mes");
  const [sensoresLabels, setSensoresLabels] = useState([]);
  const [sensoresDatasets, setSensoresDatasets] = useState([]);
  const [labels, setLabels] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [compras, setCompras] = useState([]);
  const [balance, setBalance] = useState(0);
  const [sales, setSales] = useState(0);
  const [purchases, setPurchases] = useState(0);

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (!uid) return;

    const fetchData = async () => {
      const totalSales = await getWeeklySales(uid);
      const totalPurchases = await getWeeklyPurchases(uid);
      
      setSales(Number(totalSales));
      setPurchases(Number(totalPurchases));
    };

    fetchData();
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    getBalance(uid).then((b) => setBalance(Number(b)));
  }, [uid]);

  useEffect(() => {
    const unsubscribe = getSensorsDataset(({ labels, datasets }) => {
      setSensoresLabels(labels);
      setSensoresDatasets(datasets);
    });

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, []);

  useEffect(() => {
    async function cargarDatosEntradas() {
      if (!uid) return;
      const { labels, valuesVentas, valuesCompras } = await getEntriesDataset(uid, periodo);
      setLabels(labels);
      setVentas(valuesVentas);
      setCompras(valuesCompras);
    }
    cargarDatosEntradas();
  }, [periodo, uid]);

  return (
    <>
      <section id="inicio" className="flex justify-between w-full">
        <SummaryEntry
          icon={<BsFillBarChartFill size={40} />}
          title="Ventas esta semana"
          value={`$${Number(sales).toFixed(2)}`}
        />
        <SummaryEntry
          icon={<BsPiggyBankFill size={40} />}
          title="Balance actual"
          value={`${balance < 0 ? "-" : ""}$${Math.abs(Number(balance)).toFixed(2)}`}
        />
        <SummaryEntry
          icon={<BsTagFill size={40} />}
          title="Compras esta semana"
          value={`$${Number(purchases).toFixed(2)}`}
        />
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

        <Statistics
          periodo={periodo}
          labels={labels}
          valuesVentas={ventas}
          valuesCompras={compras}
        />
      </section>

      <section id="estadísticas">
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
