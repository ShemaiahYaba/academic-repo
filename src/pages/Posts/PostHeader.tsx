import React from "react";

const PostHeader: React.FC = () => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-4">
      {/* Profile Circle */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
          {/* Placeholder initials */}
          JD
        </div>
      </div>
      {/* Text Box */}
      <input
        type="text"
        placeholder="Start a post..."
        className="flex-1 mx-4 px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
      />
      {/* Image Icon */}
      <button type="button" className="text-gray-500 hover:text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 16V6a2 2 0 012-2h14a2 2 0 012 2v10M3 16l4-4a2 2 0 012.83 0l2.34 2.34a2 2 0 002.83 0L21 10M3 16v2a2 2 0 002 2h14a2 2 0 002-2v-2"
          />
        </svg>
      </button>
    </div>
  );
};

export default PostHeader;
