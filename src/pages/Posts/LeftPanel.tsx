import React from "react";
import PopularAuthors from "@/pages/Posts/PopularAuthors";
import UserCard from "@/pages/Posts/UserCard";

const LeftPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <UserCard />
      <PopularAuthors />
    </div>
  );
};

export default LeftPanel;
