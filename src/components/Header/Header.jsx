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
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/40 border-b border-white/20 shadow-md">
        <Container>
          <nav className="flex flex-wrap items-center justify-between py-3">
            {/* Logo */}
            <Link to="/" className="block transition-transform hover:scale-105">
              <Logo className="h-auto w-24" />
            </Link>

            {/* Navigation Buttons */}
            <ul className="flex flex-wrap gap-2 sm:gap-3">
              {navItems.map(
                (item, index) =>
                  item.active && (
                    <li key={index}>
                      <button
                        onClick={() => handleNavigation(item.address)}
                        className="px-4 py-2.5 rounded-xl font-medium bg-white/50 text-indigo-700 border border-white/30 backdrop-blur-md shadow-sm hover:bg-indigo-100/50 hover:text-indigo-900 hover:shadow-md transition-all duration-200"
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
