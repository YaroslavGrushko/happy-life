import cn from "classnames";
import { useState, useEffect } from "react";
import { useMain } from "../context/mainContext";

import Image from "next/image";
import Head from "next/head";
import styles from "./MainContainer.module.scss";
import { useRouter } from "next/router";
import { TitleCard } from "./TitleCard";

import {
  RiHomeSmile2Line,
  RiHomeSmile2Fill,
  RiSearchEyeFill,
} from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { RiUser5Line, RiUser5Fill } from "react-icons/ri";
import { GrSettingsOption } from "react-icons/gr";
import { GrServices } from "react-icons/gr";
import { FaBlog } from "react-icons/fa";
import { GrBlog } from "react-icons/gr";
import bgImage from "../public/images/background.png";

const MainContainer = ({
  children,
  pageName,
  header,
  message,
  descriptionContent,
  isSettingsVisible,
}) => {
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
      case "blog":
        router.push("/blog");
        break;
      case "login":
        router.push("/login");
        break;
      case "userDashboard":
        router.push("/userDashboard");
        break;
      case "adminDashboard":
        router.push("/adminDashboard");
        break;
      default:
        router.push("/");
        break;
    }
  }, [activeTabs]);
  return (
    <div
      className={styles.MainContainer}
      style={{ backgroundColor: cn(backgroundColor) }}
    >
      <div className={styles.bgWrap}>
        <Image
          alt="Background"
          src={bgImage}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <Head>
        <title>{projectName}</title>
        <meta name="description" content={descriptionContent} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TitleCard text={header} className={styles.title} message={message} />
      {children}
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
        {isSettingsVisible && (
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
        )}
        <div className={styles.btnTab}>
          {activeTabs === "blog" ? (
            <FaBlog
              size="35"
              color="#000"
              onClick={() => setActiveTabs("blog")}
            />
          ) : (
            <GrBlog
              size="35"
              color="#000"
              onClick={() => setActiveTabs("blog")}
            />
          )}
        </div>
        <div className={styles.btnTab}>
          {activeTabs === "login" ? (
            <RiUser5Fill
              size="35"
              color="#000"
              onClick={() => setActiveTabs("login")}
            />
          ) : (
            <RiUser5Line
              size="35"
              color="#000"
              onClick={() => setActiveTabs("login")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
