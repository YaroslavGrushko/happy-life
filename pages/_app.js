import { useState } from "react";

import { MainContext } from "../context/mainContext";
import Head from "next/head";
import "./app.scss";

function MyApp({ Component, pageProps }) {
  const [projectName, setProjectName] = useState("Helixtip-top");
  const [backgroundColor, setBackgroundColor] = useState("fff");
  return (
    <div>
      <MainContext.Provider
        value={{
          projectName,
          setProjectName,
          backgroundColor,
          setBackgroundColor,
        }}
      >
        <Head />
        <Component {...pageProps} />
      </MainContext.Provider>
    </div>
  );
}

export default MyApp;
