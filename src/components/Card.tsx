import React, { useState, useEffect } from "react";
import { publicationCard, publicationOptions } from "../constants/dataItems";
import { save, like, likeActive } from "@/constants/images";

const Card: React.FC = () => {
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});
  const [displayedCards, setDisplayedCards] = useState<typeof publicationCard>([]);

  const getRandomCards = () => {
    const shuffled = [...publicationCard].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    setDisplayedCards(getRandomCards());
  }, []);

  const handleRefresh = () => {
    setDisplayedCards(getRandomCards());
  };

  const handleLikeClick = (cardId: number) => {
    setLikedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleRefresh}
        className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Refresh Cards
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {displayedCards.map((items) => (
          <div
            key={items.id}
            className="group w-full max-w-md border border-gray-200 rounded-lg shadow-lg bg-white transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <a href="#">
              <img
                className="rounded-t-lg w-full h-64 object-cover transition-all duration-300 ease-in-out group-hover:brightness-95"
                src={items.icon}
                alt={items.label}
              />
            </a>
            <div className="p-6">
              <div className="flex space-x-4 mb-4 justify-end">
                <img
                  src={publicationOptions[0].icon}
                  className="w-5 h-5 object-contain transition-all duration-300 ease-in-out"
                />
                <img
                  src={publicationOptions[1].icon}
                  className="w-5 h-5 object-contain transition-all duration-300 ease-in-out"
                />
                <img
                  src={likedCards[items.id] ? likeActive : like}
                  className="w-5 h-5 object-contain cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => handleLikeClick(items.id)}
                  alt="Like"
                />
              </div>
              <a href="#">
                <h5
                  className="mb-4 text-2xl font-bold tracking-tight text-gray-900 relative"
                  title={items.label.length > 50 ? items.label : undefined}
                >
                  <span
                    className="
                      block overflow-hidden text-ellipsis whitespace-nowrap
                      group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-wrap
                      transition-all duration-300 ease-in-out
                    "
                  >
                    {items.label}
                  </span>
                </h5>
              </a>
              <div className="flex items-center justify-between">
                <img
                  src={save}
                  className="w-5 h-5 object-contain transition-all duration-300 ease-in-out"
                />
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-light transition-colors duration-300 ease-in-out hover:text-blue-600"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
