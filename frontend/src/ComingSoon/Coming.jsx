const Coming = () => {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center font-orbitron relative bg-cover bg-center"
      style={{ backgroundImage: "url('comingsoonbg.jpg')" }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 w-full px-4">
        {/* Top Message */}
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold">
          Our Website
        </h2>

        {/* Coming Soon Text */}
        <div className="text-white font-extrabold space-y-3">
          <div className="flex items-center justify-center space-x-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide">
            <span>C</span>
            <img
              src="https://thumbs.wbm.im/pw/medium/cf3856a1c655538917c7afc782baaa94.avif"
              alt="rotating letter image"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-spin"
            />
            <span>ming</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide">
            <span>S</span>
            <img
              src="https://thumbs.wbm.im/pw/medium/cf3856a1c655538917c7afc782baaa94.avif"
              alt="rotating letter image"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-spin"
            />
            <img
              src="https://thumbs.wbm.im/pw/medium/cf3856a1c655538917c7afc782baaa94.avif"
              alt="rotating letter image"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-spin"
            />
            <span>n</span>
          </div>
        </div>

        {/* Bottom Message */}
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl px-4 max-w-3xl">
          This page is under construction. Meanwhile, you can view other fields
        </p>
      </div>
    </div>
  );
};

export default Coming;
