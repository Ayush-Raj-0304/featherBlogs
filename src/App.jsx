import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from 'react-router-dom';

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
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-tl from-gray-800 via-gray-900 to-black">
      {/* Responsive Wrapper */}
      <div className="w-full">
        <Header />
        
        {/* Horizontal Rule with Responsive Spacing */}
        <hr className="border-gray-600  "  />

        {/* Main Content Area */}
        <main className="text-gray-200 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
          <Outlet />
        </main>

        {/* Horizontal Rule with Responsive Spacing */}
        <hr className="border-gray-600 " />

        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
