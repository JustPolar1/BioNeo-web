import BarLeft from './BarLeft';
import BoardHeader from './mainBoard/BoardHeader';
import MainBoard from "./mainBoard/MainBoard";
import Profile from './mainBoard/rightPanel/Profile';

import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { app } from '../../../firebaseConfig';

export default function Dashboard() {
    const [name, setName] = useState("Cargando...");
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchName = async () => {
            const uid = localStorage.getItem("uid");
            if (!uid) return;
            const db = getFirestore(app);
            const userDoc = doc(db, "users", uid);
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
                setName(userSnap.data().name);
            }
        };
        fetchName();
    }, []);

    useEffect(() => {
        const fetchEntries = async () => {
            const uid = localStorage.getItem("uid");
            if (!uid) return;
            const db = getFirestore(app);
            const entriesRef = collection(db, "entries");
            const q = query(
                entriesRef,
                where("userId", "==", uid),
                orderBy("date", "desc"),
                limit(3) // Cambia el límite si quieres más o menos registros recientes
            );
            const querySnap = await getDocs(q);
            const entriesArr = querySnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEntries(entriesArr);
        };
        fetchEntries();
    }, []);

    return (
        <>
            <BarLeft />
            <div className="flex flex-col w-full shadow-[-8px_8px_18px_0_rgba(0,0,0,0.2)] bg-white dark:bg-gray-900 rounded-4xl my-1 mr-1 ">
                <div className='flex gap-5 h-full'>
                    <div className='flex-1 flex flex-col'>
                        <BoardHeader />
                        <main className="flex overflow-y-auto overflow-x-hidden flex-col justify-between pb-5 pl-5 gap-5 max-h-full">
                            <MainBoard />
                        </main>
                    </div>
                    <Profile 
                        image="https://th.bing.com/th/id/OIP.qw42y3S9KyR2Wn9JVAWArgHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3" 
                        name={name} 
                        email={localStorage.getItem("email")} 
                        entries={entries} // <-- aquí pasas los registros recientes
                    />
                </div>
            </div>
        </>
    )
}