import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LayoutWrapper from "./components/LayoutWrapper";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 rounded-full bg-white/60 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="flex flex-col min-h-screen w-full">
        <Header />

        <main className="flex-grow w-full px-4 py-10">
          {/* <div className="max-w-5xl mx-auto p-8 rounded-3xl backdrop-blur-xl bg-white/60 border border-white/40 shadow-[0_8px_32px_0_rgba(99,102,241,0.15)] transition-all hover:shadow-[0_8px_32px_0_rgba(99,102,241,0.25)]"> */}
            <Outlet />
          {/* </div> */}
        </main>

        <Footer />
      </div>
    </LayoutWrapper>
  );
}

export default App;