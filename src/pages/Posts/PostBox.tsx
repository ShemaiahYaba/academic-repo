import React from "react";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-pink-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          <span>128</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.02-3.39A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>24</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m12-6V6a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h8"
              />
            </svg>
            <span>10</span>
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex justify-between border-t pt-2 text-gray-600">
        <button className="flex items-center space-x-1 hover:text-pink-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15a7 7 0 0014 0V5a2 2 0 00-2-2H7a2 2 0 00-2 2v10z"
            />
          </svg>
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.02-3.39A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-green-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m12-6V6a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h8"
            />
          </svg>
          <span>Repost</span>
        </button>
      </div>
    </div>
  );
};
export default PostBox;
