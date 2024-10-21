import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import PostForm from "../components/PostForm/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/database_service";

function EditPost() {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const { postId } = useParams(); // Ensure you're extracting the correct id param from the URL

  useEffect(() => {
    if (postId) {
      dbService.getPost(postId).then((res) => {
        if (res) {
          console.log(postId);
          setPost(res);
        } else {
          navigate("/");
        }
      });
    }
  }, [postId, navigate]);

  return post ? (
    <div className="py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen">
      <Container>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-gray-100 mb-6">
            Edit Post
          </h1>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
