export default function PeriodChanger () {
    return (
        <div className="bg-[#dffff3] dark:bg-[#003d26] rounded-full p-1 flex justify-center items-center gap-1">
            <PeriodButton>Semanas</PeriodButton>
            <PeriodButton>Meses</PeriodButton>
        </div>
    )
}

function PeriodButton({ children }) {
    return (
        <button className="px-1 rounded-full active:bg-[linear-gradient(to_right,_#2fba87_20%,_#00fa9f_40%)] text-gray-700 dark:text-gray-200 active:text-black">{children}</button>
    )
}