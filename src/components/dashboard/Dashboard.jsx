import BarLeft from './BarLeft';
import BoardHeader from './mainBoard/BoardHeader';
import MainBoard from "./mainBoard/MainBoard";
import Profile from './mainBoard/rightPanel/Profile';
import CalendarWithSummary from './mainBoard/rightPanel/CalendarWithSummary';

import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { app } from '../../../firebaseConfig';

export default function Dashboard() {
  const [name, setName] = useState('Cargando…');
  const [entries, setEntries] = useState([]);
  const [asideOpen, setAsideOpen] = useState(true);

  useEffect(() => {
    (async () => {
      const uid = localStorage.getItem('uid');
      if (!uid) return;
      const db = getFirestore(app);
      const userSnap = await getDoc(doc(db, 'users', uid));
      userSnap.exists() && setName(userSnap.data().name);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const uid = localStorage.getItem('uid');
      if (!uid) return;
      const db = getFirestore(app);
      const q = query(
        collection(db, 'entries'),
        where('userId', '==', uid),
        orderBy('date', 'desc'),
        limit(3)
      );
      const snap = await getDocs(q);
      setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  const handleEntryUpdated = (u) =>
    setEntries((prev) => prev.map((e) => (e.id === u.id ? { ...e, ...u } : e)));
  const handleEntryDeleted = (id) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));
  const handleEntryCreated = (n) => setEntries((p) => [n, ...p].slice(0, 3));

  return (
    <>
      <BarLeft onEntryCreated={handleEntryCreated} />

      <div className="flex flex-col w-full overflow-hidden shadow-[-8px_8px_18px_0_rgba(0,0,0,0.2)] bg-white dark:bg-gray-900 rounded-4xl my-1 mr-1">
        <div className="flex gap-0 h-full relative">
          <div className="flex-1 flex flex-col min-w-0">
            <BoardHeader />
            <main className="flex overflow-y-auto overflow-x-hidden flex-col justify-between pb-5 pl-5 gap-5 max-h-full">
              <MainBoard />
            </main>
          </div>

          {/* Aside con botón de mostrar/ocultar */}
          <aside
            className={`transition-all duration-300 overflow-hidden ${asideOpen ? 'w-70 min-w-[200px] max-w-[320px]' : 'w-5 min-w-5'}`}
          >
            <div className={`h-full pl-5 overflow-y-auto w-full transition-opacity duration-300 ${asideOpen ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'}`}>
              <Profile
                image="https://th.bing.com/th/id/OIP.qw42y3S9KyR2Wn9JVAWArgHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3"
                name={name}
                email={localStorage.getItem('email') ?? ''}
                entries={entries}
                onEntryUpdated={handleEntryUpdated}
                onEntryDeleted={handleEntryDeleted}
              />
              <CalendarWithSummary />
            </div>
          </aside>

          <button
            className="hover:cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-9 bg-gray-300 dark:bg-gray-700 rounded-l-xl shadow w-6 h-12 flex items-center justify-center"
            onClick={() => setAsideOpen(!asideOpen)}
            title={asideOpen ? 'Ocultar panel' : 'Mostrar panel'}
          >
            <span className="text-gray-700 dark:text-gray-200">{asideOpen ? '>' : '<'}</span>
          </button>
        </div>
      </div>
    </>
  );
}