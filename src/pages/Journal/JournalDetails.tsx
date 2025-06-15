import { useParams, useNavigate } from "react-router-dom";
import { journalData } from "../../constants/dataItems"; // Adjust the path to match your structure
import React from "react";

const JournalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the `id` from the URL
  const navigate = useNavigate();
  const journal = journalData.find((item) => item.id === Number(id)); // Find the journal by `id`

  if (!journal) {
    return <div className="p-6">Journal not found.</div>; // Handle invalid `id`
  }

  const handleExportCitation = () => {
    // Format: Author(s). (Year). Title. Journal Name, Volume(Issue), Pages.
    const citation = `${journal.authors}. (2024). ${journal.title}. Journal of Tetra-Science.`;
    navigator.clipboard.writeText(citation);
    alert("Citation copied to clipboard!");
  };

  const handleDownload = () => {
    // Placeholder for download functionality
    alert("Download functionality will be implemented soon!");
  };

  return (
    <div className="font-montserrat p-6">
      {/* Go Back Button */}
      <button
        onClick={() => navigate("/journals")}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Go Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{journal.title}</h1>
      <p className="font-montserrat text-sm text-gray-600 mb-4">
        By {journal.authors}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => window.open(`/read/${id}`, '_blank')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Read Online
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Download PDF
        </button>
        <button
          onClick={handleExportCitation}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Export Citation
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Abstract</h2>
        <p className="font-bold text-lg">Abstract </p>
        <p className="font-medium text-lg">
          {journal.abstract}
        </p>
      </div>

      <div className="mt-8">
        <p className="text-sm">
          <span className="font-bold">Keywords: </span>
          {journal.keywords}
        </p>
        <p className="text-sm mt-2">
          <span className="font-bold">Ratings: </span>
          {journal.ratings} ({journal.reviews} reviews)
        </p>
      </div>
    </div>
  );
};

export default JournalDetail;
