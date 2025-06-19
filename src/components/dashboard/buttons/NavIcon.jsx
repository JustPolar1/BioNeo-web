export default function NavIcon({children}) {
    return (
        <button className="hover:bg-[#ffffff80] flex content-center items-center gap-2 text-left p-5 hover:cursor-pointer duration-300 active:bg-[#00000030] active-duration-30 w-full">
            {children}
        </button>
    )
}