import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import PostCard from "../components/PostCard/PostCard";
import dbService from "../appwrite/database_service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData ? userData.$id : null; // Safely access userId

    useEffect(() => {
        if (authStatus && userId) { // Check if userId is valid
            dbService.getPosts(userId).then((res) => {
                if (res) {
                    setPosts(res.documents);
                }
            });
        }
    }, [authStatus, userId]);

    // Landing page for unauthenticated users
    if (!authStatus) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-200 px-4">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4">
            Welcome to FeatherBlogs!
          </h1>
          <p className="mt-2 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Discover insightful articles and connect with others in the
            community.
          </p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Join Us Today!
        </h2>
        <p className="mb-6 text-center text-gray-300 text-sm sm:text-base md:text-lg px-4 max-w-lg mx-auto">
          Sign up or log in to explore a variety of topics and contribute your
          knowledge.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <Link to="/signup">
            <button className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-md transition duration-200 shadow-lg transform hover:scale-105 w-full sm:w-auto">
              Sign Up
            </button>
          </Link>
          <Link to="/login" className="p-2">
            <button className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-6 rounded-md transition duration-200 shadow-lg transform hover:scale-105 w-full sm:w-auto">
              Log In
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
    // Display posts for authenticated users
    return (
        <div className="w-full py-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <Container>
                <div className="flex flex-wrap justify-center">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2">
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center text-gray-300">
                            <h2 className="text-2xl">No Posts Available</h2>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;
