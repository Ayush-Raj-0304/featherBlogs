import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import PostCard from "../components/PostCard/PostCard";
import dbService from "../appwrite/database_service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData ? userData.$id : null;

  useEffect(() => {
    if (authStatus && userId) {
      dbService
        .getPosts(userId)
        .then((res) => {
          if (res) setPosts(res.documents);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [authStatus, userId]);

  if (!authStatus) {
    return (
      <AnimatedFadeIn>
        <div className="flex flex-col justify-center items-center px-4 py-24">
          <div className="relative w-full max-w-3xl rounded-3xl p-12 text-center backdrop-blur-2xl bg-white/40 border border-white/30 shadow-2xl">
            <div className="absolute -z-10 -top-12 -left-12 w-64 h-64 bg-indigo-300/30 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-12 -right-12 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl" />
            <h1 className="text-5xl font-bold text-zinc-900 mb-6 leading-tight">
              Write. Share. Inspire.
            </h1>
            <p className="text-lg text-zinc-700 mb-8">
              Join FeatherBlogs today and start your journey of expressive and
              impactful storytelling.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-base font-medium shadow-md transition-all">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-white/70 hover:bg-white text-indigo-700 px-6 py-3 rounded-xl text-base font-medium border border-indigo-300 shadow-sm transition-all">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedFadeIn>
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="p-4 rounded-full bg-white/60 backdrop-blur-xl shadow-lg">
          <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <AnimatedFadeIn delay={0.2}>
      <div className="px-4 py-16">
        <div className="relative max-w-7xl mx-auto rounded-3xl p-10 backdrop-blur-2xl bg-white/40 border border-white/30 shadow-xl">
          <div className="absolute -z-10 -top-16 -left-16 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute -z-10 -bottom-16 -right-16 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

          <h2 className="text-4xl font-semibold text-zinc-900 mb-10 text-center">
            Your Dashboard
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-zinc-500 text-lg">
              You haven’t posted anything yet. Start creating now!
            </p>
          )}
        </div>
      </div>
    </AnimatedFadeIn>
  );
}

export default Home;
