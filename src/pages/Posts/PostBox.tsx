import React from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

const PostBox: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-4 space-y-4">
      {/* Post Header */}
      <div className="flex items-center space-x-3">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold text-gray-900">John Doe</div>
          <div className="text-xs text-gray-500">2 hours ago</div>
        </div>
      </div>

      {/* Post Description */}
      <div className="text-gray-800">
        This is a sample post description. Share your thoughts with the world!
      </div>

      {/* Post Media */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Post media"
          className="rounded-lg w-full object-cover"
        />
      </div>

      {/* Post Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <HeartIcon className="h-5 w-5 text-pink-500 fill-pink-500" />
          <span>128</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
            <span>24</span>
          </div>
          <div className="flex items-center space-x-1">
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex justify-between border-t pt-2 text-gray-600">
        <button className="flex items-center space-x-1 hover:text-pink-500 transition">
          <HeartIcon className="h-5 w-5" />
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500 transition">
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-green-500 transition">
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          <span>Repost</span>
        </button>
      </div>
    </div>
  );
};
export default PostBox;
