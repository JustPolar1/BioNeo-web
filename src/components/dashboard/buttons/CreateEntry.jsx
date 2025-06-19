export default function CreateEntry({ children }) {
    return (
        <button className="p-1 shadow-lg w-[100%] rounded-full bg-white hover:cursor-pointer text-black flex content-center items-center gap-2">
            {children}
        </button>
    )
}