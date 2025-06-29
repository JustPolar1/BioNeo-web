import { BsArrowRightSquareFill } from "react-icons/bs";

export default function RecentEntry({ description, amount, onView }) {
    return (
        <article className="w-full dark:bg-[#003d26] bg-[#dffff3] flex p-2 rounded-xl justify-between">
            <div className="flex flex-col">
                <h1 className="font-bold text-l text-[#2fba87] truncate overflow-hidden whitespace-nowrap max-w-[130px]">{description}</h1>
                <p className="text-sm dark:text-gray-200 text-black">${amount}</p>
            </div>
            <button onClick={onView}>
                <BsArrowRightSquareFill 
                    size={32}
                    color="#2fba87"
                    className="hover:cursor-pointer transition-transform duration-200 hover:scale-105 active:duration-80 active:scale-95"
                />
            </button>
        </article>
    )
}