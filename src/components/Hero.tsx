import { banner } from "@/constants/images";

const Hero = () => {
  return (
    <div className="relative w-full ">
      <img src={banner} className="w-full h-full object-cover" />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>

      {/* Text */}
      <div className="absolute inset-0 flex flex-col  gap-y-1.5 p-10 md:p-5 justify-center">
        <h1 className="text-white text-xl md:text-6xl lg:text-3xl font-bold ">
          Journal Of Tetra-Science
        </h1>
        <p className="text-white font-bold">
          Advancing interdisciplinary research through innovative scholarship and
          <br />
          comprehensive academic resources. Our repository curates cutting-edge
          <br />
          research across multiple domains, from traditional academic papers to
          <br />
          digital media and creative works. Discover, explore, and contribute to
          <br />
          the future of scientific knowledge.
        </p>
      </div>
    </div>
  );
};

export default Hero;
