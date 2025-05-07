import LeftPanel from "@/pages/Posts/LeftPanel";
import RightPanel from "@/pages/Posts/RightPanel";

import PostHeader from "@/pages/Posts/PostHeader";
import { RandomPostBox } from "./RandomPostBox";

const Posts: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen box-border p-4">
      <div className="flex flex-1 flex-col md:flex-row gap-4">
        {/* Left Panel */}
        <div className="hidden md:block w-full md:w-1/4 min-w-[200px] max-w-xs box-border">
          <LeftPanel />
        </div>

        {/* Center Content */}
        <div className="flex-1 flex justify-center box-border">
          <div className="w-full max-w-xl bg-[#f5f6fa] rounded-lg shadow p-4 space-y-4">
            <PostHeader />

            <RandomPostBox />
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden md:block w-full md:w-1/4 min-w-[200px] max-w-xs box-border">
          <RightPanel />
        </div>
      </div>
    </div>
  );
};
export default Posts;
