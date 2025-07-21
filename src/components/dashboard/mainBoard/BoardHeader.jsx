import Search from "../inputs/Search";

export default function BoardHeader({ onSearchResults }) {
  return (
    <header className="py-5 pl-5 flex justify-center items-center gap-5">
      <h1 className="text-gradient adaptable dark:text-gradient-inverted color-white text-2xl font-bold text-center">
        Dashboard
      </h1>
      <Search onResults={onSearchResults} />
    </header>
  );
}
