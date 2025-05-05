import React from "react";
import dbService from "../../appwrite/database_service";
import { Link } from "react-router-dom";
import AnimatedFadeIn from "../AnimatedFadeIn";

function PostCard({ $id, title, featuredImage }) {
  return (
    <AnimatedFadeIn >
    <Link to={`/post/${$id}`} className="block group transition-transform transform hover:scale-[1.02]">
      <div className="w-full rounded-2xl bg-white/30 backdrop-blur-xl border border-white/30 shadow-xl overflow-hidden transition-all duration-300">
        {/* Image */}
        <div className="h-48 overflow-hidden">
          <img
            src={dbService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Title */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-zinc-800 group-hover:text-indigo-600 transition-colors duration-200">
            {title}
          </h2>
        </div>
      </div>
    </Link>
    </AnimatedFadeIn>
  );
}

export default PostCard;
