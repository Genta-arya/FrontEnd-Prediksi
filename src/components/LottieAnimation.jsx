import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation/folder.json";

const LottieAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-white">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="lg:w-96 md:w-96 w-64 "
      />
      <p className="font-bold text-lg mb-2 text-center">
        Drag & Drop atau Pilih File
      </p>
      <p className="text-sm text-gray-400 text-center">
        (JPG, PNG, JPEG)
      </p>
    </div>
  );
};

export default LottieAnimation;
