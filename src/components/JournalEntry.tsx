import { useNavigate } from "react-router-dom";
import { marginLine } from "../constants/images";

type JournalEntryProps = {
  id: number; // Ensure `id` is passed for navigation
  title: string;
  authors: string;
  keywords: string;
  ratings: string;
  reviews: number;
};

const JournalEntry = ({ id, title, authors, keywords, ratings, reviews }: JournalEntryProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/journal/${id}`); // Redirect to the journal detail page
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg shadow-lg p-5 gap-4 cursor-pointer hover:shadow-lg"
    >
      {/* Left Section */}
      <div>
        <h3 className="text-xl font-light">{title}</h3>
        <p className="text-sm pt-2 font-light">{authors}</p>
        <p className="text-md mt-2">
          <span className="font-bold">Journal Keywords: <br/> </span>
          <span className="font-light">
            {keywords}
          </span>
        </p>
        <a href="#" className="text-sm mt-2 inline-block">
          Read Abstract
        </a>
      </div>

      {/* Margin line */}
      <div className="flex items-center">
        <img src={marginLine} className="h-50 object-contain" />
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-start text-left left-16 font-light gap-y-1.5 ml-1">
        <p className="mt-2 item-start">
          <span className="font-light">Ratings: <br /> </span>
          {ratings} ({reviews} reviews)
        </p>
      </div>
    </div>
  );
};

export default JournalEntry;
