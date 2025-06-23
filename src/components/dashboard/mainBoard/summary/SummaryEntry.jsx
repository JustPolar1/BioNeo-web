export default function SummaryEntry({ icon, title, value }) {
    return (
        <article className="flex gap-3 items-center justify-center">
            <span className="text-[#2fba87] h-full flex items-center">
                {icon}
            </span>
            <div>
                <h1 className="text-[#2fba87] text-lg ">{title}</h1>
                <p className="text-black dark:text-gray-200">{value}</p>
            </div>
        </article>
    )
}