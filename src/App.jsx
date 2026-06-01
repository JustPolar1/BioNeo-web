import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import LogIn from "./components/logIn/LogIn";
import Dashboard from "./components/dashboard/Dashboard";

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ user, children }) {
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <div className='w-full'><LogIn /></div>
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <div className='bg-[radial-gradient(ellipse_at_bottom_right,_#2fba87_65%,_#00fa9f_100%)] flex w-full'>
                <Dashboard />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
