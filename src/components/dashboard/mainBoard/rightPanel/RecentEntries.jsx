import { BsArrowRightSquareFill } from "react-icons/bs";

export default function RecentEntry () {
    return (
        <article className="w-full bg-[#00000080]] flex p-2 rounded-xl justify-between">
            <div className="flex flex-col">
                <h1 className="font-bold text-l text-[#a54b37]">Caca de vaca</h1>
                <p className="text-sm">$500.00</p>
            </div>
            <button>
                <BsArrowRightSquareFill 
                size={32}
                color="#a54b37"
                className="hover:cursor-pointer transition-transform duration-200 hover:scale-105 active:duration-80 active:scale-95"
                />
            </button>
        </article>
    )
}