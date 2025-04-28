import RecentArticles from "@/pages/Posts/RecentArticles";
import RecentJournals from "@/pages/Posts/RecentJournals";

const RightPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <RecentArticles />
      <RecentJournals />
    </div>
  );
};
export default RightPanel;
