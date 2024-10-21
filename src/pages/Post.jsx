import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/database_service";
import Container from "../components/Container/Container";
import { useSelector } from "react-redux";
import Button from "../components/Button/Button";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isTheAuthor = post && userData ? post.userId === userData.$id : false;

  const { postId } = useParams(); // Ensure you're extracting the correct id param from the URL

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

  const deletePost = () => {
    dbService.deletePost(postId).then((res) => {
      if (res) {
        dbService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 min-h-screen">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-gray-800 shadow-lg">
          <img
            src={dbService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
          {isTheAuthor && (
            <div className="absolute right-6 top-6 flex space-x-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-100">
            {post.title}
          </h1>
        </div>
        <div className="text-gray-200">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
