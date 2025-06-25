import { BsSearch } from "react-icons/bs"

export default function Search() {
    return (
        <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-gray-400 pointer-events-none ">
                <BsSearch />
            </span>
            <input
                placeholder="Buscar entradas"
                className="dark:bg-[#003d26] bg-[#dffff3] text-black dark:text-gray-400 w-full rounded-xl p-3 pl-10"
                type="text"
            />
        </div>
    )
}