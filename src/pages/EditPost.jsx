import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import PostForm from "../components/PostForm/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/database_service";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      dbService.getPost(postId).then((res) => {
        if (res) {
          setPost(res);
        } else {
          navigate("/");
        }
      });
    }
  }, [postId, navigate]);

  return post ? (
    <AnimatedFadeIn>
      <div className="px-4 ">
        <Container>
          <div className="relative max-w-4xl mx-auto rounded-3xl p-10 backdrop-blur-2xl bg-white/30 border border-white/30 shadow-xl">
            {/* Decorative mesh gradients */}
            <div className="absolute -z-10 -top-16 -left-16 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-16 -right-16 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />

            <h1 className="text-4xl font-bold text-zinc-900 mb-8 text-center">
              Edit Your Post
            </h1>

            <PostForm post={post} />
          </div>
        </Container>
      </div>
    </AnimatedFadeIn>
  ) : null;
}

export default EditPost;
