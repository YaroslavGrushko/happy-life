import { useState } from "react";

import { MainContext } from "../context/mainContext";
import Head from "next/head";
import "./app.scss";

function MyApp({ Component, pageProps }) {
  const [projectName, setProjectName] = useState("Helixtip-top");
  return (
    <div>
      <MainContext.Provider
        value={{
          projectName,
          setProjectName,
        }}
      >
        <Head />
        <Component {...pageProps} />
      </MainContext.Provider>
    </div>
  );
}

export default MyApp;
