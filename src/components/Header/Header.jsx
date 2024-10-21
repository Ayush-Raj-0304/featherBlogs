import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", address: "/", active: true },
    { name: "Login", address: "/login", active: !authStatus },
    { name: "SignUp", address: "/signup", active: !authStatus },
    { name: "All Posts", address: "/all-posts", active: authStatus },
    { name: "Add Post", address: "/add-post", active: authStatus },
  ];

  const handleNavigation = (address) => {
    setTimeout(() => navigate(address), 100);
  };

  return (
    <header className="py-3 shadow bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <Container>
        <nav className="flex flex-wrap items-center justify-between">
          <div className="flex-shrink-0 mr-4 py-2">
            <Link to="/">
              <Logo className="py-2" />
            </Link>
          </div>
          <ul className="flex flex-wrap ml-auto space-x-2 sm:space-x-4 text-gray-200">
            {navItems.map(
              (item, index) =>
                item.active && (
                  <li key={index}>
                    <button
                      className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200 w-full sm:w-auto"
                      onClick={() => handleNavigation(item.address)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
