import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo/Logo";
import LayoutWrapper from "./LayoutWrapper";

function NotFound() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen flex items-center justify-center relative px-6 py-16 text-center">
        <div className="relative z-10 max-w-xl w-full p-10 flex flex-col items-center justify-center gap-4 rounded-3xl backdrop-blur-2xl bg-white/40 border border-white/30 shadow-2xl">
          {/* Ambient blobs */}
          <div className="absolute -z-10 -top-20 -left-20 w-64 h-64 bg-indigo-300/30 rounded-full blur-3xl" />
          <div className="absolute -z-10 -bottom-24 -right-24 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl" />

          {/* Logo centered above */}
          <div className="mb-2">
            <Logo className="w-20 h-auto" />
          </div>

          <h1 className="text-6xl font-extrabold text-zinc-800 tracking-tight">
            404
          </h1>
          <p className="text-lg text-zinc-600 mb-4">
            Oops! The page you're looking for doesn’t exist.
          </p>

          <Link
            to="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </LayoutWrapper>
  );
}

export default NotFound;
