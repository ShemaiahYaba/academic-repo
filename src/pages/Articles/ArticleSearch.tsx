import React, { useState } from "react";

const ArticleSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Author");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform the search logic here
    alert(`Searching for "${searchTerm}" by "${searchBy}"`);
  };

  return (
    <div className="w-full max-w-xl bg-white bg-opacity-95 rounded-lg shadow-lg p-4">
      {/* Search Filters */}
      <div className="flex items-center gap-4 justify-between mb-4">
        {["Author", "Title", "Keywords", "Research Field"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              searchBy === filter
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            onClick={() => setSearchBy(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder={`Search by ${searchBy}`}
          className="flex-grow p-3 border rounded-lg focus:outline-none text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ArticleSearch;
