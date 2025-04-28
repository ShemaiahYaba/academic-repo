import React from "react";

const UserCard: React.FC = () => {
  return (
    <>
      <div className="w-[300px] p-6 bg-[#f5f6fa] rounded-xl shadow-md">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            {/* Profile Circle */}
            <div className="w-20 h-20 min-w-20 min-h-20 max-w-20 max-h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl mr-4 text-gray-500 font-bold">
              JD
            </div>
            <div>
              <div className="font-semibold text-xl mb-1">John Doe</div>
              {/* Research Field */}
              <div className="flex flex-wrap gap-1 mb-2 text-xs">
                Computer Science AI Machine Learning
              </div>
            </div>
          </div>
          {/* Bio */}
          <div className="text-gray-500 text-sm text-left mb-4">
            {/* Replace with {user.bio} */}
            Passionate about AI and data science, Passionate about AI and data.
            science,
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

export default UserCard;
