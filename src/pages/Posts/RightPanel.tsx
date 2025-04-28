import RecentArticles from "@/pages/Posts/RecentArticles";
import Feed from "@/pages/Posts/Feed";

const RightPanel: React.FC = () => {
  return (
    <div className="w-[250px] p-6 bg-[#f5f6fa] rounded-xl shadow-md">
      <div className="flex flex-col items-center">
        {/* Recent Journal Uploads */}
        <RecentArticles />
        {/* Feed */}
        <Feed />
      </div>
    </div>
  );
};
export default RightPanel;
