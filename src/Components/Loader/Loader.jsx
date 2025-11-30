import React from "react";
import loadingAnimation from "../../assets/animations/loading.json";
import Lottie from "lottie-react";
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="max-w-sm relative">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
