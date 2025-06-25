export default function NavIcon({ children, onClick }) {
    return (
        <button
            className="hover:bg-[#ffffff80] flex items-center gap-2 text-left p-5 hover:cursor-pointer duration-300 active:bg-[#00000030] w-full"
            onClick={onClick}
        >
            {children}
        </button>
    );
}