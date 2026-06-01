// searchController.js
import { getFirestore, collection, query, where, orderBy, limit, getDocs, startAt, endBefore } from "firebase/firestore";
import { app } from "../../../../firebaseConfig";

const db = getFirestore(app);

export async function searchEntries(uid, searchTerm = "", filters = {}) {
  let q = collection(db, "entries");
  let constraints = [where("userId", "==", uid)];

  if (searchTerm) {
    const endTerm = searchTerm.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
    constraints.push(where("description", ">=", searchTerm));
    constraints.push(where("description", "<", endTerm));
    constraints.push(orderBy("description"));
  }

  if (filters.dateFrom) {
    constraints.push(where("date", ">=", filters.dateFrom));
  }

  if (filters.dateTo) {
    constraints.push(where("date", "<=", filters.dateTo));
  }

  constraints.push(orderBy("date", "desc"));
  constraints.push(limit(10));

  const snap = await getDocs(query(q, ...constraints));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getRecentEntries(uid) {
  const q = query(
    collection(db, "entries"),
    where("userId", "==", uid),
    orderBy("date", "desc"),
    limit(6)
  );

  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
