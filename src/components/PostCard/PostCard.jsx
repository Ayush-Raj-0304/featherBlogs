import React from "react";
import dbService from "../../appwrite/database_service";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-800 rounded-xl p-4 transition-transform transform hover:scale-105 shadow-md">
        <div className="w-full flex flex-col justify-center mb-4">
          <img
            src={dbService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl h-48 object-cover mb-2"
          />
          <h2 className="text-lg font-semibold text-gray-200">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
