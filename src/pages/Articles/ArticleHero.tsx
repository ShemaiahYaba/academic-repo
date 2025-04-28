import React from "react";
import { banner } from "@/constants/images";

const ArticleHero: React.FC = () => {
  return (
    <>
      <div className="font-montserrat relative w-full rounded-4xl overflow-hidden">
        <img
          src={banner}
          className="w-full h-auto max-h-[200px] object-cover"
          alt="Library Banner"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

        {/* Text and Search */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 space-y-8">
          {/* Header Text */}
          <div>
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold">
              Explore thousands of <br /> articles at your fingertips!
            </h1>
            <p className="text-white text-base md:text-lg font-medium mt-2">
              Find the perfect one to spark your curiosity and fuel your
              passion.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleHero;
