import { banner } from "../constants/images";

const Hero = () => {
  return (
    <div className="relative w-full ">
      <img src={banner} className="w-full h-full object-cover" />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>

      {/* Text */}
      <div className="absolute inset-0 flex flex-col  gap-y-1.5 p-10 md:p-5 justify-center">
        <h1 className="text-white text-xl md:text-6xl lg:text-3xl font-bold ">
          Digital Repository
        </h1>
        <p className="text-white font-bold">
        Welcome, this repository provides access to a diverse range of research  <br/>
        materials, including journal articles, conference proceedings, practice-based <br/>
        research, videos, audio recordings, artworks,exhibitions, books, book chapters, <br/>
        theses, and datasets. Full-text access is available where permitted, alongside <br/>
        detailed citations for restricted materials
        </p>
      </div>
    </div>
  );
};

export default Hero;
