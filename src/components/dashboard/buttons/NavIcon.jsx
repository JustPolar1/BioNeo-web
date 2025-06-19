export default function NavIcon({children}) {
    return (
        <button className="hover:bg-[#ffffff30] flex content-center items-center gap-2 text-left p-5 hover:cursor-pointer w-full">
            {children}
        </button>
    )
}