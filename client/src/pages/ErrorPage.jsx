import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center mt-52">
      <h1 className=" text-3xl mb-10">Oops!</h1>
      <p className="mb-10">Sorry, an unexpected error has occurred.</p>
      <p>
        <i className=" text-blue-gray-300">{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
