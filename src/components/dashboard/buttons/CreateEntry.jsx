export default function CreateEntry({ children, onClick }) {
    return (
        <button  
        className="p-1 shadow-lg w-[100%] rounded-full bg-white hover:cursor-pointer text-black flex content-center items-center gap-2 transition-transform duration-200 hover:scale-105 active:duration-80 active:scale-95"
        onClick={onClick ? () => onClick() : undefined}
        >
            {children}
        </button>
    )
}