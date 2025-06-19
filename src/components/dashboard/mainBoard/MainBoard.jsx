import Search from "../inputs/Search"

export default function MainBoard() {
    return (
        <>
            <header className="p-5 flex justify-center items-center gap-5">
                <h1 className="text-gradient color-white text-2xl font-bold text-center">Dashboard</h1>
                <Search />
            </header>
        </>
    )
}