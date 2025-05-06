import React from "react";
import Container from "../components/Container/Container";
import PostForm from "../components/PostForm/PostForm";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

function AddPost() {
  return (
    <AnimatedFadeIn>
      <div className="px-4 ">
        <Container>
          <div className="relative max-w-4xl mx-auto rounded-3xl p-10 backdrop-blur-2xl bg-white/30 border border-white/30 shadow-xl">
            {/* Decorative mesh gradients */}
            <div className="absolute -z-10 -top-16 -left-16 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-16 -right-16 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

            <h1 className="text-4xl font-bold text-zinc-900 mb-8 text-center">
              Create a New Post
            </h1>

            <PostForm />
          </div>
        </Container>
      </div>
    </AnimatedFadeIn>
  );
}

export default AddPost;
