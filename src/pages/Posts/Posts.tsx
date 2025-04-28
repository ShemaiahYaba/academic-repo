import LeftPanel from "@/pages/Posts/LeftPanel";
import RightPanel from "@/pages/Posts/RightPanel";
import PostBox from "@/pages/Posts/PostBox";
import PostHeader from "@/pages/Posts/PostHeader";

const Posts: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="w-1/4 min-w-[200px] max-w-xs">
          <LeftPanel />
        </div>
        <div className="flex-1 flex flex-col px-4">
          <PostHeader />
          <div className="flex-1 flex flex-col">
            <PostBox />
          </div>
        </div>
        <div className="w-1/4 min-w-[200px] max-w-xs">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};
export default Posts;
