import { getFirestore, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { app } from "../../../../../firebaseConfig";

const db = getFirestore(app);

export async function getWeeklySales(uid) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const q = query(
    collection(db, "entries"),
    where("userId", "==", uid),
    where("type", "==", "venta"),
    where("date", ">=", sevenDaysAgo),
    orderBy("date", "desc")
  );

  const snap = await getDocs(q);

  let total = 0;
  snap.docs.forEach(doc => {
    const data = doc.data();
    total += data.amount || 0;
  });

  return total;
}