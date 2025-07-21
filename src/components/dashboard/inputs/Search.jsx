import { useState, useEffect, useRef } from "react";
import { BsFilter, BsSearch } from "react-icons/bs";
import { searchEntries } from "./searchController";
import ViewEntryModal from "../ViewEntryModal";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const containerRef = useRef(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openEntry(entry) {
    setSelectedEntry(entry);
    setModalOpen(true);
    setActive(false);
  }

  function closeEntry() {
    setModalOpen(false);
    setTimeout(() => setSelectedEntry(null), 300);
  }


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActive(false);
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!active) return;

    async function fetchEntries() {
      const uid = localStorage.getItem("uid");
      if (!uid) return;

      if (!searchTerm && !dateFrom && !dateTo) {
        const entries = await searchEntries(uid); // carga 10 recientes
        setResults(entries);
      } else {
        const filters = {};
        if (dateFrom) filters.dateFrom = new Date(dateFrom);
        if (dateTo) filters.dateTo = new Date(dateTo);

        const entries = await searchEntries(uid, searchTerm, filters);
        setResults(entries);
      }
    }

    fetchEntries();
  }, [searchTerm, dateFrom, dateTo, active]);

  const onSubmit = (e) => {
    e.preventDefault();
    // la búsqueda ya se lanza con el useEffect, pero igual por submit llamamos explícito
    const uid = localStorage.getItem("uid");
    if (!uid) return;

    const filters = {};
    if (dateFrom) filters.dateFrom = new Date(dateFrom);
    if (dateTo) filters.dateTo = new Date(dateTo);

    searchEntries(uid, searchTerm, filters).then(setResults);
  };

  const handleFilterClick = () => {
    setActive(true);
    setShowFilters((prev) => !prev);
  };

  return (
    <>
      {active && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10" />}

      <div ref={containerRef} className="relative w-full z-10">
        <form onSubmit={onSubmit} className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-gray-400 pointer-events-none">
            <BsSearch />
          </span>

          <input
            type="text"
            placeholder="Buscar entradas"
            className="dark:bg-[#003d26] bg-[#dffff3] text-black dark:text-gray-400 w-full rounded-xl p-3 pl-10"
            value={searchTerm}
            onFocus={() => setActive(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="button"
            onClick={handleFilterClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black dark:text-gray-400 hover:cursor-pointer"
            aria-label="Filtrar"
          >
            <BsFilter size={24} />
          </button>
        </form>

        {active && (
          <div className="absolute top-full left-0 w-full mt-2 dark:bg-[#003d26] bg-[#dffff3] rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 max-h-80 overflow-y-auto p-3 z-100">
            {showFilters && (
              <div className="flex gap-2 mb-3">
                <input
                  type="date"
                  className="flex-1 p-2 rounded-lg dark:bg-[#002916] bg-[#c6f2dd] text-black dark:text-gray-300"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  aria-label="Fecha desde"
                />
                <input
                  type="date"
                  className="flex-1 p-2 rounded-lg dark:bg-[#002916] bg-[#c6f2dd] text-black dark:text-gray-300"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  aria-label="Fecha hasta"
                />
              </div>
            )}

            {results.length ? (
              results.map((entry) => (
                <div
                  key={entry.id}
                  className="p-2 rounded hover:bg-[#fffff1] dark:hover:bg-[#004f35] cursor-pointer"
                  onClick={() => openEntry(entry)}
                >
                  <p className="font-semibold capitalize text-black dark:text-gray-200">{entry.description}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    ${entry.amount} —{" "}
                    {entry.date?.seconds
                      ? new Date(entry.date.seconds * 1000).toLocaleDateString()
                      : entry.date}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                No se encontraron resultados
              </p>
            )}
          </div>
        )}
        <ViewEntryModal
          isOpen={modalOpen}
          entry={selectedEntry}
          onClose={closeEntry}
        />
      </div>
    </>
  );
}
