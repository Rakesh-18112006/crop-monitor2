
import React from "react";
const Notfound = () => {
    return (
        <div
            className="h-screen flex flex-col items-center justify-center relative font-orbitron"
            style={{
                backgroundImage: "url('comingsoonbg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
                {/* 404 Number */}
                <div className="text-white font-extrabold text-[5rem] sm:text-[7rem] md:text-[10rem] leading-none tracking-wide">
                    4
                    <span className="relative inline-block text-[11rem]">
                        o
                        <span className="absolute inset-0 top-7 flex items-center justify-center text-white text-[2rem] sm:text-[3rem] md:text-[4rem] font-bold">
                            ?
                        </span>
                    </span>
                    4
                </div>

                {/* Error Message */}
                <div className="text-white text-lg sm:text-xl md:text-2xl px-4">
                    Sorry, the page you are looking for does not exist.
                </div>

                {/* Redirect Link */}
                <div>
                    <a
                        href="/login"
                        className="text-blue-500 text-lg sm:text-xl md:text-2xl font-semibold hover:underline"
                    >
                        Please continue to our <span className="font-bold">home page</span>.
                    </a>

                </div>
            </div>
        </div>
    );
};

export default Notfound;
