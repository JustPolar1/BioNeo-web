import { BsDropletFill, BsFillBarChartFill, BsPiggyBankFill } from "react-icons/bs";
import SummaryEntry from "./summary/SummaryEntry";
import PeriodChanger from "./statistics/PeriodChanger";
import Statistics from "./statistics/Statistics";

export default function MainBoard () {
    return (
        <>
            <section className="flex justify-between w-full">
                <SummaryEntry icon={<BsFillBarChartFill size={40} />} title="Hola mundo" value="21.79%"/>
                <SummaryEntry icon={<BsPiggyBankFill size={40} />} title="Balance actual" value="$58,127.91"/>
                <SummaryEntry icon={<BsDropletFill size={40} />} title="Agua ahorrada" value="117 litros"/>
            </section>
            <section>
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-[#2fba87] text-bold text-xl">
                            Gastos realizados
                        </h1>
                        <p className="text-black dark:text-gray-200">
                            Resumen global
                        </p>
                    </div>
                    <PeriodChanger />
                </div>
                <Statistics />
            </section>
        </>    
    )
}