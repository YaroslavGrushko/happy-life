import { useState } from "react";

import { MainContext } from "../context/mainContext";
import Head from "next/head";
import "./app.scss";

function MyApp({ Component, pageProps }) {
  const [cmsName, setCmsName] = useState("Helixtip-top");
  const [cmsBackgroundColor, setCmsBackgroundColor] = useState("transparent");
  const [titleBackgroundColor, setTitleBackgroundColor] =
    useState("transparent");
  const [titleTextColor, setTitleTextColor] = useState("transparent");
  const [cardBackgroundColor, setCardBackgroundColor] = useState("transparent");
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
          cmsName,
          setCmsName,
          cmsBackgroundColor,
          setCmsBackgroundColor,
          titleBackgroundColor,
          setTitleBackgroundColor,
          titleTextColor,
          setTitleTextColor,
          cardBackgroundColor,
          setCardBackgroundColor,
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
