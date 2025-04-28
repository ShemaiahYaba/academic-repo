import React from "react";
import ArticleHero from "./ArticleHero";
import ArticleCards from "./ArticleCards";
import ArticleSearch from "./ArticleSearch";
import ArticleFeed from "./ArticleFeed";
import Pagination from "@/components/Pagination";

const Articles: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Center Content */}
      <div className="flex-1 flex justify-center box-border">
        <div className="w-full p-4 space-y-4">
          <ArticleHero />
          <ArticleCards />
          <hr className="my-8 border-t border-gray-300 opacity-50" />
          <div>
            <h1 className="text-6xl font-bold mb-4 text-gray-800">
              Search Articles
            </h1>
            <ArticleSearch />
          </div>
          <ArticleFeed />
        </div>
      </div>
      <div className="flex justify-center py-6">
        <Pagination />
      </div>
    </div>
  );
};

export default Articles;
