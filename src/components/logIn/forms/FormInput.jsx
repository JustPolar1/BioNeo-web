export default function FormInput ({icon, placeholder, type, name}) {
    return (
        <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
            </span>
            <input
                placeholder={placeholder}
                className="bg-[#69503C80] w-full rounded-full p-3 pl-12"
                type={type}
                name={name}
            />
        </div>
    )
}