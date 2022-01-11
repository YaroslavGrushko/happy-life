import cn from "classnames";
import { useState, useEffect } from "react";
import { useMain } from "../context/mainContext";

import Image from "next/image";
import Head from "next/head";
import styles from "./MainContainer.module.scss";
import { useRouter } from "next/router";

import {
  RiHomeSmile2Line,
  RiHomeSmile2Fill,
  RiSearchEyeFill,
} from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { RiUser5Line, RiUser5Fill } from "react-icons/ri";
import { GrSettingsOption } from "react-icons/gr";
import { GrServices } from "react-icons/gr";
import bgImage from "../public/images/box-market-electronic-ordering-shop-basket.webp";

const MainContainer = ({ pageName, descriptionContent, Content }) => {
  const { projectName } = useMain();
  const { backgroundColor } = useMain();
  const router = useRouter();
  const [activeTabs, setActiveTabs] = useState(pageName);
  useEffect(() => {
    switch (activeTabs) {
      case "home":
        router.push("/");
        break;
      case "search":
        router.push("/search");
        break;
      case "settings":
        router.push("/settings");
        break;
      case "account":
        router.push("/account");
        break;
      default:
        router.push("/");
        break;
    }
  }, [activeTabs]);
  return (
    <div style={{ backgroundColor: cn(backgroundColor) }}>
      {/* <div className={styles.bgWrap}>
        <Image
          alt="Background"
          src={bgImage}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div> */}
      <Head>
        <title>{projectName}</title>
        <meta name="description" content={descriptionContent} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content />
      <div className={styles.bottomNav}>
        <div className={styles.btnTab}>
          {activeTabs === "home" ? (
            <RiHomeSmile2Fill
              size="35"
              color="#000"
              onClick={() => setActiveTabs("home")}
            />
          ) : (
            <RiHomeSmile2Line
              size="35"
              color="#000"
              onClick={() => setActiveTabs("home")}
            />
          )}
        </div>
        <div className={styles.btnTab}>
          {activeTabs === "search" ? (
            <RiSearchEyeFill
              size="35"
              color="#000"
              onClick={() => setActiveTabs("search")}
            />
          ) : (
            <BiSearchAlt
              size="35"
              color="#000"
              onClick={() => setActiveTabs("search")}
            />
          )}
        </div>
        <div className={styles.btnTab}>
          {activeTabs === "settings" ? (
            <GrServices
              size="35"
              color="#000"
              onClick={() => setActiveTabs("settings")}
            />
          ) : (
            <GrSettingsOption
              size="35"
              color="#000"
              onClick={() => setActiveTabs("settings")}
            />
          )}
        </div>
        <div className={styles.btnTab}>
          {activeTabs === "account" ? (
            <RiUser5Fill
              size="35"
              color="#000"
              onClick={() => setActiveTabs("account")}
            />
          ) : (
            <RiUser5Line
              size="35"
              color="#000"
              onClick={() => setActiveTabs("account")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
