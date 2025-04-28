import React from "react";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

const PopularAuthors: React.FC = () => {
  return (
    <div className="w-[250px] p-6 bg-[#f5f6fa] rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <ChevronRightIcon className="w-5 h-5 text-gray-500 mr-2" />
        <h2 className="font-semibold">Popular Authors</h2>
      </div>
      <ul>
        <li className="flex items-center justify-between mb-4">
          <div>
            <div className="font-medium">Dr. Jane Smith</div>
            <div className="text-sm text-gray-500">Machine Learning</div>
          </div>
          <span className="text-gray-700 font-semibold">42</span>
        </li>
        <li className="flex items-center justify-between mb-4">
          <div>
            <div className="font-medium">Prof. John Doe</div>
            <div className="text-sm text-gray-500">Quantum Computing</div>
          </div>
          <span className="text-gray-700 font-semibold">35</span>
        </li>
        <li className="flex items-center justify-between">
          <div>
            <div className="font-medium">Dr. Emily Zhang</div>
            <div className="text-sm text-gray-500">Bioinformatics</div>
          </div>
          <span className="text-gray-700 font-semibold">28</span>
        </li>
      </ul>
    </div>
  );
};

export default PopularAuthors;
