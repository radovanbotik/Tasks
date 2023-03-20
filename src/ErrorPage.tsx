import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
