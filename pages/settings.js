import Image from "next/image";
import axios from "axios";
import { useMain } from "../context/mainContext";
import excel from "../public/images/excel.png";
import favicon from "../public/images/favicon.png";
import bgImage from "../public/images/bgImage.png";
import { FaFileUpload } from "react-icons/fa";
import MainContainer from "../containers/MainContainer";

import styles from "./settings.module.scss";

export default function Settings() {
  const { projectName, setProjectName } = useMain();
  const { setBackgroundColor } = useMain();

  function onSettingsSubmit(event) {
    event.preventDefault();
    var body = new FormData();
    let files_to_upload = event.target.files;
    body.append("file", files_to_upload[0]);

    axios.post("/api/flask/excelProjectSettings", body).then((response) => {
      setProjectName(response.data.cmsName);
      setBackgroundColor(response.data.backgroundColor);
    });
  }

  function onFaviconSubmit(event) {
    event.preventDefault();
    var body = new FormData();
    let files_to_upload = event.target.files;
    body.append("file", files_to_upload[0]);

    axios.post("/api/flask/favicon", body).then((response) => {
      console.log("favicon is updated");
    });
  }
  const Content = () => {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to settings of {projectName} CMS
          </h1>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Settings &rarr;</h2>
              <Image src={excel} alt="excel" />
              <form onSubmit={onSettingsSubmit}></form>
              <p>Download Settings File</p>
              <div className={styles.customFileUploadWrapper}>
                <label
                  htmlFor="file-upload"
                  className={styles.customFileUpload}
                >
                  <FaFileUpload /> &nbsp;Upload File
                </label>
              </div>
              <input
                id="file-upload"
                type="file"
                className={styles.fileUpload}
                onChange={onSettingsSubmit}
              />
            </div>

            <div className={styles.card}>
              <h2>Favicon &rarr;</h2>
              <Image src={favicon} alt="favicon" />
              <form onSubmit={onFaviconSubmit}></form>
              <p>Download Favicon</p>
              <div className={styles.customFileUploadWrapper}>
                <label
                  htmlFor="favicon-upload"
                  className={styles.customFileUpload}
                >
                  <FaFileUpload /> &nbsp;Upload File
                </label>
              </div>
              <input
                id="favicon-upload"
                type="file"
                className={styles.fileUpload}
                onChange={onFaviconSubmit}
              />
            </div>
            <div className={styles.card}>
              <h2>Db &rarr;</h2>
              <p>download project database</p>
            </div>
            <div className={styles.card}>
              <h2>Images &rarr;</h2>
              <Image src={bgImage} alt="background" />
              <p>download bg image</p>
              <div className={styles.customFileUploadWrapper}>
                <label
                  htmlFor="bg-image-upload"
                  className={styles.customFileUpload}
                >
                  <FaFileUpload /> &nbsp;Upload File
                </label>
              </div>
              <input
                id="bg-image-upload"
                type="file"
                className={styles.fileUpload}
                onChange={onFaviconSubmit}
              />
            </div>
          </div>
        </main>

        {/* <footer className={styles.footer}>
          <a
            href="https://yaroslavgrushko.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by&nbsp;
            <span className={styles.Powered}>YG</span>
          </a>
        </footer> */}
      </div>
    );
  };
  return (
    <MainContainer
      pageName={"settings"}
      descriptionContent={"Settings page of helixtip.top CMS"}
      Content={Content}
    />
  );
}
