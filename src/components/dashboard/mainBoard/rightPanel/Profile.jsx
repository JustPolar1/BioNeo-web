import RecentEntry from "./RecentEntries"

export default function Profile ({image, name, email}) {
    return (
        <aside className="flex flex-col py-5 pr-5 gap-5">
            <div className="flex gap-5 justify-center items-center">
                <img className="w-12 rounded-full" src={image} />
                <div className="flex flex-col">
                    <h1 className="font-bold text-l text-black dark:text-white">{name}</h1>
                    <p className="text-sm text-gray-500 text-bold">{email}</p>
                </div>
            </div>
            <section className="flex flex-col gap-5">
                <RecentEntry />
                <RecentEntry />
                <RecentEntry />
            </section>
        </aside>
    )
}