export default function FormInput({ icon, placeholder, type, name, value, onChange }) {
    return (
        <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-white">
                {icon}
            </span>
            <input
                placeholder={placeholder}
                className="bg-[#69503C80] w-full rounded-full p-3 pl-12 dark:text-white"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}