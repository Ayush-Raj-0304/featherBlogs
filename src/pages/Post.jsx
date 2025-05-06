import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/database_service";
import Container from "../components/Container/Container";
import { useSelector } from "react-redux";
import Button from "../components/Button/Button";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isTheAuthor = post && userData ? post.userId === userData.$id : false;

  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      dbService.getPost(postId).then((res) => {
        if (res) {
          setPost(res);
        } else {
          navigate("/");
        }
      }).finally(() => setLoading(false));
    }
  }, [postId, navigate]);

  const deletePost = () => {
    dbService.deletePost(postId).then((res) => {
      if (res) {
        dbService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="p-4 rounded-full bg-white/60 backdrop-blur-xl shadow-lg">
          <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return post ? (
    <div className="px-4 min-h-screen bg-transparent">
      <Container>
        {/* Featured Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10 backdrop-blur-xl bg-white/20 border border-white/30">
          <img
            src={dbService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-[420px] object-cover object-center rounded-3xl"
          />
          {isTheAuthor && (
            <div className="absolute top-5 right-5 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="hover:bg-emerald-500">
                  Edit
                </Button>
              </Link>
              <Button  className="hover:bg-rose-700" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="mx-auto max-w-6xl p-10 rounded-[2rem] backdrop-blur-2xl bg-white/50 border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
          <h1 className="text-center text-5xl font-bold text-zinc-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="text-center text-sm text-gray-500 mb-6">
            {`Posted by User ID: ${post.userId} (User identity anonymized for privacy)`}
          </div>

          <article className="prose prose-lg max-w-none text-zinc-800">
            {parse(post.content)}
          </article>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
