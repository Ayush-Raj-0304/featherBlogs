import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import LogoutBtn from "./LogoutBtn";
import AnimatedFadeIn from "../AnimatedFadeIn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", address: "/", active: true },
    { name: "Login", address: "/login", active: !authStatus },
    { name: "SignUp", address: "/signup", active: !authStatus },
    { name: "Explore", address: "/all-posts", active: authStatus },
    { name: "Create", address: "/add-post", active: authStatus },
  ];

  const handleNavigation = (address) => {
    setTimeout(() => navigate(address), 100);
  };

  return (
    <AnimatedFadeIn>
      <header className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-md border-b border-white/20 shadow-md">
        <Container>
          <nav className="flex flex-wrap items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="transition-transform hover:scale-105">
              <Logo className="w-24 h-auto" />
            </Link>

            {/* Navigation */}
            <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
              {navItems.map(
                (item, index) =>
                  item.active && (
                    <li key={index}>
                      <button
                        onClick={() => handleNavigation(item.address)}
                        className="px-4 py-2 rounded-lg font-medium text-sm bg-white/60 text-indigo-700 border border-white/30 hover:bg-indigo-100/60 hover:text-indigo-900 transition-all duration-200 shadow-sm backdrop-blur-sm"
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
    </AnimatedFadeIn>
  );
}

export default Header;
