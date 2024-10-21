import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import dbService from "../appwrite/database_service";
import PostCard from "../components/PostCard/PostCard";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        dbService.getPosts().then((res) => {
            if (res) {
                setPosts(res.documents);
            }
        });
    }, []);

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

export default AllPosts;
