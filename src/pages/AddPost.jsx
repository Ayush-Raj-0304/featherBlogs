import React from "react";
import Container from "../components/Container/Container";
import PostForm from "../components/PostForm/PostForm";

function AddPost() {
  return (
    <div className="py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen">
      <Container>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-gray-100 mb-6">
            Add a New Post
          </h1>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
