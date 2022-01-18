import { useState } from "react";

import { MainContext } from "../context/mainContext";
import Head from "next/head";
import "./app.scss";

function MyApp({ Component, pageProps }) {
  const [projectName, setProjectName] = useState("Helixtip-top");
  const [backgroundColor, setBackgroundColor] = useState("fff");
  const [authTokens, setAuthTokens] = useState();
  const setTokens = (data) => {
    localStorage.setItem("x-access-token", JSON.stringify(data));
    setAuthTokens(data);
  };
  const [isSignUpPressed, setIsSignUpPressed] = useState();

  return (
    <div>
      <MainContext.Provider
        value={{
          projectName,
          setProjectName,
          backgroundColor,
          setBackgroundColor,
          authTokens,
          setAuthTokens: setTokens,
          isSignUpPressed,
          setIsSignUpPressed,
        }}
      >
        <Head />
        <Component {...pageProps} />
      </MainContext.Provider>
    </div>
  );
}

export default MyApp;
