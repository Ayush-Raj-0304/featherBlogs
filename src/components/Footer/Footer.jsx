import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Footer() {
  return (
    <footer className="relative overflow-hidden py-12 px-8 backdrop-blur-xl bg-white/30 border-t border-white/20 shadow-xl">
      {/* Decorative Glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-300/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute -bottom-28 -right-28 w-80 h-80 bg-pink-300/20 rounded-full blur-[120px] -z-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-zinc-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-4 inline-flex items-center">
              <Logo width="100px" />
            </div>
            <p className="text-sm text-zinc-500 max-w-xs">
              FeatherBlogs — A space to share your voice and stories with the world.
            </p>
            <p className="mt-4 text-xs text-zinc-400">&copy; 2024 Ayush Raj. All rights reserved.</p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-zinc-500 tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">About</Link></li>
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Features</Link></li>
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Careers</Link></li>
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Press</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-zinc-500 tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Blog</Link></li>
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Help Center</Link></li>
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Contact</Link></li>
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Status</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-zinc-500 tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Terms of Service</Link></li>
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Privacy Policy</Link></li>
              <li><Link className="hover:underline hover:text-indigo-700 transition" to="/not-found">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
