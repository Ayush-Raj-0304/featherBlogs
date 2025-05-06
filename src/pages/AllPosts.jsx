import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import dbService from "../appwrite/database_service";
import PostCard from "../components/PostCard/PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    dbService.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents);
      }
    }).finally(() => setLoading(false));
  }, []);
  console.log(posts.map((post)=>(post)));
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
    <div className="px-4">
      <Container>
        <div className="relative max-w-7xl mx-auto rounded-3xl p-10 backdrop-blur-2xl bg-white/30 border border-white/30 shadow-xl">
          <div className="absolute -z-10 -top-16 -left-16 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute -z-10 -bottom-16 -right-16 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

          <h2 className="text-4xl font-semibold text-zinc-900 mb-10 text-center">
            Explore All Posts
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center text-zinc-500 text-lg">
              No posts available at the moment.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
