import React from "react";
import loading from "./loading.svg";

const Loading = () => {
  return (
    <div className="loadingSpinner">
      <div>
        <p>Is loading</p>
      </div>
      <div>
        <img src={loading} alt="" />
      </div>
    </div>
  );
};

export default Loading;
