import React, { useState } from "react";
import { publicationCard, publicationOptions } from "../constants/dataItems";
import { save, like, likeActive } from "@/constants/images";

const Card: React.FC = () => {
  // State to track which cards have active likes
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});

  // Toggle like status for a specific card
  const handleLikeClick = (cardId: number) => {
    setLikedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {publicationCard.map((items) => (
        <div
          key={items.id}
          className="w-full max-w-md border border-gray-200 rounded-lg shadow-lg bg-white"
        >
          <a href="#">
            <img
              className="rounded-t-lg w-full h-64 object-cover"
              src={items.icon}
              alt={items.label}
            />
          </a>
          <div className="p-6 ">
            {/* Icons Row */}
            <div className="flex space-x-4 mb-4 justify-end">
              {/* Word icon */}
              <img
                src={publicationOptions[0].icon}
                className="w-5 h-5 object-contain"
              />
              {/* Share icon */}
              <img
                src={publicationOptions[1].icon}
                className="w-5 h-5 object-contain"
              />
              {/* Like icon - clickable */}
              <img
                src={likedCards[items.id] ? likeActive : like}
                className="w-5 h-5 object-contain cursor-pointer"
                onClick={() => handleLikeClick(items.id)}
                alt="Like"
              />
            </div>
            {/* Card Content */}
            <a href="#">
              <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                {items.label}
              </h5>
            </a>
            <div className="flex justify-between justify-items-center">
              <img src={save} className="w-5 h-5 object-contain" />
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-light t"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
