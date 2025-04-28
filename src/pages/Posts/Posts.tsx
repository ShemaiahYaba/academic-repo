import LeftPanel from "@/pages/Posts/LeftPanel";
import RightPanel from "@/pages/Posts/RightPanel";
import PostBox from "@/pages/Posts/PostBox";
import PostHeader from "@/pages/Posts/PostHeader";

const Posts: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PostHeader />
      <div className="flex flex-1">
        <LeftPanel />
        <div className="flex flex-1 flex-col">
          <PostBox />
        </div>
        <RightPanel />
      </div>
    </div>
  );
};
export default Posts;
