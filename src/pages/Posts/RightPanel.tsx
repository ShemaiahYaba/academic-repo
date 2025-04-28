import React from "react";

type Journal = {
  id: string;
  title: string;
  uploadedAt: string;
};

type User = {
  avatarUrl?: string;
  firstName: string;
  lastName: string;
  researchField: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  journals: Journal[];
};

const mockUser: User = {
  avatarUrl: "",
  firstName: "John",
  lastName: "Doe",
  researchField: "Computer Science",
  bio: "Passionate about AI and data science.",
  followersCount: 1234,
  followingCount: 567,
  journals: [
    { id: "1", title: "Deep Learning Advances", uploadedAt: "2024-06-01" },
    { id: "2", title: "AI in Healthcare", uploadedAt: "2024-05-28" },
    { id: "3", title: "Data Science Trends", uploadedAt: "2024-05-20" },
  ],
};

const RightPanel: React.FC<{ user?: User }> = ({ user = mockUser }) => {
  return (
    <div className="w-[250px] p-6 bg-[#f5f6fa] rounded-xl shadow-md">
      <div className="flex flex-col items-center">
        {/* Profile Circle */}
        <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-gray-500 mb-4 overflow-hidden">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>
              {user.firstName[0]}
              {user.lastName[0]}
            </span>
          )}
        </div>
        {/* Name */}
        <div className="font-semibold text-xl mb-1">
          {user.firstName} {user.lastName}
        </div>
        {/* Research Field */}
        <div className="text-gray-500 text-sm mb-2">{user.researchField}</div>
        {/* Bio */}
        <div className="text-gray-500 text-sm text-center mb-4">{user.bio}</div>
        {/* Followers & Following */}
        <div className="flex justify-between w-full mb-2">
          <div className="text-center flex-1">
            <div className="font-semibold text-base">
              {user.followersCount.toLocaleString()}
            </div>
            <div className="text-gray-500 text-xs">Followers</div>
          </div>
          <div className="text-center flex-1">
            <div className="font-semibold text-base">
              {user.followingCount.toLocaleString()}
            </div>
            <div className="text-gray-500 text-xs">Following</div>
          </div>
        </div>
        {/* Recent Journal Uploads */}
        <div className="w-full mt-4">
          <div className="font-semibold text-sm mb-2">Recent Journals</div>
          <ul className="space-y-2">
            {user.journals.slice(0, 3).map((journal) => (
              <li
                key={journal.id}
                className="bg-white rounded p-2 shadow text-xs"
              >
                <div className="font-medium">{journal.title}</div>
                <div className="text-gray-400">{journal.uploadedAt}</div>
              </li>
            ))}
            {user.journals.length === 0 && (
              <li className="text-gray-400 text-xs">No recent uploads.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
