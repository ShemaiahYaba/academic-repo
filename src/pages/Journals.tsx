import { useState } from "react";
import { banner, tabdown } from "../constants/images";
import JournalEntry from "../components/JournalEntry";
import { journalData } from "../constants/dataItems";


const Journals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("Author");

  const handleSearch = () => {
    // Perform the search logic here
    alert(`Searching for "${searchTerm}" by "${searchBy}"`);
  };

  return (
    <div>
    <div className="font-montserrat relative w-full">
      {/* Background Image */}
      <img
        src={banner}
        className="w-full h-screen object-cover"
        alt="Library Banner"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

      {/* Text and Search */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 space-y-8">
        {/* Header Text */}
        <div className="">
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
            Explore thousands of <br/> journals at your fingertips!
          </h1>
          <p className="text-white text-base md:text-lg font-medium mt-2">
            Find the perfect one to suit your needs
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xl bg-white bg-opacity-95 rounded-lg shadow-lg p-3  justify-center items-center ">
          {/* Search Filters */}
          <div className="flex items-center gap-2 justify-between">
            {[
              "Author",
              "Title",
              "Date Issued",
              "Subject",
              "ISSN",
            ].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-lg items-center justify-center font-medium transition ${
                searchBy === filter
                  ? "bg-black text-white"
                  : "bg-white hover:bg-white"
              }`}
                onClick={() => setSearchBy(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          
        </div>
        {/* Search Input */}
        <div className="flex items-center">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={`Search by ${searchBy}`}
              className="flex-grow w-3xl p-3 border rounded-lg focus:outline-none  text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </form>
          </div>
      </div>
    </div>


       {/* Search journals or Browsing */}
       <div className="p-5">

          <div className="flex flex-row gap-x-52">
             <div>
               <text className=" font-bold text-2xl">Browsing all fields</text>
             </div>

              <div className="flex flex-row items-center gap-1.5">
                <text className=" font-bold text-2xl">Sort By</text>
                <button>
                <img src={tabdown} className=" w-4 h-4 object-contain"/>
                </button>      
              </div>
          </div>

          
          <div className="flex justify-between items-center mt-6 px-3">
          <button className="text-black hover:underline">First</button>
          <button className="text-black hover:underline">Prev</button>
          <span>Page 1 of 200</span>
          <button className="text-black hover:underline">Next</button>
        </div>
  

         {/* Journal Entries */}
      <div className="p-5 space-y-6">
        {journalData.map((journal) => (
          <JournalEntry key={journal.id} {...journal} />
        ))}
      </div>
        
         
      <div className="flex justify-between items-center mt-6 px-3">
          <button className="text-black hover:underline">First</button>
          <button className="text-black hover:underline">Prev</button>
          <span>Page 1 of 200</span>
          <button className="text-black hover:underline">Next</button>
        </div>

  </div>

        
  </div>
  );
};

export default Journals;
