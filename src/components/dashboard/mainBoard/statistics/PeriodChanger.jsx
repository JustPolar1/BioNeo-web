export default function PeriodChanger({ periodo, setPeriodo }) {
    return (
        <div className="bg-[#dffff3] dark:bg-[#003d26] rounded-full p-1 flex justify-center items-center gap-1">
            <PeriodButton
                active={periodo === "semana"}
                onClick={() => setPeriodo("semana")}
            >
                Semana
            </PeriodButton>
            <PeriodButton
                active={periodo === "mes"}
                onClick={() => setPeriodo("mes")}
            >
                Mes
            </PeriodButton>
        </div>
    );
}

function PeriodButton({ children, onClick, active }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 rounded-full transition-all duration-200 text-sm font-medium hover:cursor-pointer
                ${active
                    ? "bg-gradient-to-r from-[#2fba87] to-[#00fa9f] text-black shadow-md hover:pointer-events-none"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        >
            {children}
        </button>
    );
}
