import React from "react";

const LeftPanel: React.FC = () => {
  return (
    <>
      <div className="w-[250px] p-6 bg-[#f5f6fa] rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          {/* Profile Circle */}
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-gray-500 mb-4">
            {/* Replace with <img src={user.avatarUrl} ... /> if available */}
            <span>AB</span>
          </div>
          {/* Name */}
          <div className="font-semibold text-xl mb-1">
            {/* Replace with {user.firstName} {user.lastName} */}
            John Doe
          </div>
          {/* Research Field */}
          <div className="text-gray-500 text-sm mb-2">
            {/* Replace with {user.researchField} */}
            Computer Science
          </div>
          {/* Bio */}
          <div className="text-gray-500 text-sm text-center mb-4">
            {/* Replace with {user.bio} */}
            Passionate about AI and data science.
          </div>
          {/* Followers & Following */}
          <div className="flex justify-between w-full mb-2">
            <div className="text-center flex-1">
              <div className="font-semibold text-base">
                {/* Replace with {user.followersCount} */}
                1,234
              </div>
              <div className="text-gray-500 text-xs">Followers</div>
            </div>
            <div className="text-center flex-1">
              <div className="font-semibold text-base">
                {/* Replace with {user.followingCount} */}
                567
              </div>
              <div className="text-gray-500 text-xs">Following</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftPanel;
