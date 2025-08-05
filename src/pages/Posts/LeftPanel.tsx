import React from "react";
import PopularAuthors from "@/pages/Posts/PopularAuthors";
import UserCard from "@/pages/Posts/UserCard";
import { useAuth } from "@/contexts/AuthProvider";

const LeftPanel: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      {user?.email && <UserCard userEmail={user.email} />}
      <PopularAuthors />
    </div>
  );
};

export default LeftPanel;
