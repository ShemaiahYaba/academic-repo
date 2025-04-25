const Preloader = () => {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* Animated Text */}
      <h1 className="font-bold text-5xl md:text-8xl text-white tracking-wide">
        <span className="animate-pulse">LOADING</span>
        <span className="text-sky-500 animate-bounce">...</span>
      </h1>
    </div>
  );
};

export default Preloader;
