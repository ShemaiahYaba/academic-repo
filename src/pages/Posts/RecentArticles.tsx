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

const RecentArticles: React.FC<{ user?: User }> = ({ user = mockUser }) => {
  return (
    <div className="w-[250px] p-6 bg-[#f5f6fa] rounded-xl shadow-md">
      <div className="flex flex-col items-center">
        {/* Recent Journal Uploads */}
        <div className="w-full mt-4">
          <div className="font-semibold text-sm mb-2">Recent Articles</div>
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

export default RecentArticles;
