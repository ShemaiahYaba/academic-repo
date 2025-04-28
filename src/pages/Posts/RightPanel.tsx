import RecentArticles from "@/pages/Posts/RecentArticles";
import RecentJournals from "@/pages/Posts/RecentJournals";

const RightPanel: React.FC = () => {
  return (
    <div className="w-[250px] p-6 rounded-xl shadow-md">
      <div className="flex flex-col items-center">
        {/* Recent Journal Uploads */}
        <RecentArticles />
        <div className="my-6 w-full border-t border-gray-200" />
        {/* Feed */}
        <RecentJournals />
      </div>
    </div>
  );
};
export default RightPanel;
