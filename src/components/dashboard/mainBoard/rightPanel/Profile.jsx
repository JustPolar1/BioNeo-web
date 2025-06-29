import RecentEntry from "./RecentEntries"

export default function Profile({ image, name, email, entries = [] }) {
    return (
        <aside className="flex flex-col py-5 pr-5 gap-5">
            <div className="flex gap-5 justify-center items-center">
                <img className="w-12 rounded-full" src={image} />
                <div className="flex flex-col min-w-0">
                    <h1 className="font-bold text-l text-black dark:text-white truncate overflow-hidden whitespace-nowrap max-w-[120px]">{name}</h1>
                    <p className="text-sm text-gray-500 text-bold truncate overflow-hidden whitespace-nowrap max-w-[120px]">{email}</p>
                </div>
            </div>
            <section className="flex flex-col gap-5">
                {entries.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center">Sin registros recientes</p>
                ) : (
                    entries.map((entry, idx) => (
                        <RecentEntry
                            key={entry.id || idx}
                            description={entry.description}
                            amount={entry.amount}
                        />
                    ))
                )}
            </section>
        </aside>
    )
}