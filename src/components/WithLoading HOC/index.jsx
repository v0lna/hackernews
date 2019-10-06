import React from "react";
import Loading from "../Loading";

const WithLoading = (Component) => ({ isLoading, ...rest }) => {
  return isLoading ? <Loading /> : <Component {...rest} />;
};

export default WithLoading;
