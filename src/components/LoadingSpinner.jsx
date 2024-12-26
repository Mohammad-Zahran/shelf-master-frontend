import React from "react";

function LoadingSpinner() {
  return (
    <div className="h-screen flex items-center justify-center">
      <span className="loading loading-bars loading-lg bg-steelBlue"></span>
    </div>
  );
}

export default LoadingSpinner;
