import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useMain } from "../context/mainContext";
import excel from "../public/images/excel.png";
import favicon from "../public/images/favicon.png";
import backgroundImage from "../public/images/background.png";
import { FaFileUpload } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import MainContainer from "../components/MainContainer";
import { ButtonInput } from "../components/ButtonInput";
import { ButtonDownload } from "../components/ButtonDownload";
import styles from "./settings.module.scss";

export default function Settings() {
  const { projectName, setProjectName } = useMain();
  const { setBackgroundColor } = useMain();
  const [frm_image, setImage] = useState(backgroundImage);

  const onSettingsSubmit = (event) => {
    event.preventDefault();
    var body = new FormData();
    let files_to_upload = event.target.files;
    body.append("file", files_to_upload[0]);

    axios.post("/api/flask/excelProjectSettings", body).then((response) => {
      setProjectName(response.data.cmsName);
      setBackgroundColor(response.data.backgroundColor);
    });
  };
  const downloadLinkOnclickHandler = () => {
    alert("downloading may take several minutes");
  };
  const onFaviconSubmit = (event) => {
    event.preventDefault();
    var body = new FormData();
    let files_to_upload = event.target.files;
    body.append("file", files_to_upload[0]);

    axios.post("/api/flask/favicon", body).then((response) => {
      console.log("favicon is updated");
    });
  };

  const onBgImageSubmit = (event) => {
    var body = new FormData();
    let files_to_upload = event.target.files;
    body.append("file", files_to_upload[0]);

    axios.post("/api/flask/bgImage", body).then((response) => {
      console.log("background image is updated");
    });
  };

  const onChangePicture = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setIsUploadVisible(true);
  };
  const [isUplaodVisible, setIsUploadVisible] = useState(false);

  const [token, setToken] = useState();
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("x-access-token"));
    setToken(token);
  }, []);

  const Content = () => {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>{projectName} settings</h1>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Settings &rarr;</h2>
              <Image src={excel} alt="excel" />

              <ButtonDownload
                labelText="Download Settings from CMS"
                Icon={BiDownload}
                href={"/api/flask/setupDownload?x-access-token=" + token}
                onClick={downloadLinkOnclickHandler}
              />

              <ButtonInput
                inputType="file"
                labelText="Upload Settings to CMS"
                Icon={FaFileUpload}
                onChange={onSettingsSubmit}
                inputId="settings"
              />
            </div>

            <div className={styles.card}>
              <h2>Favicon &rarr;</h2>
              <Image src={favicon} alt="favicon" />
              <form onSubmit={onFaviconSubmit}></form>
              <p>Upload Favicon</p>
              <ButtonInput
                inputType="file"
                labelText="Upload file to CMS"
                Icon={FaFileUpload}
                onChange={onFaviconSubmit}
                inputId="favicon"
              />
            </div>

            <div className={styles.card}>
              <h2>Db &rarr;</h2>
              <p>download project database</p>
            </div>

            <div className={styles.card}>
              <h2>Images &rarr;</h2>
              <Image
                id="image"
                src={frm_image}
                alt="background"
                layout="responsive"
                objectFit="contain"
                width={500}
                height={500}
              />
              <p>Upload background image</p>
              <form>
                {/* <div className={styles.customFileUploadWrapper}>
                  <label
                    htmlFor="bg-image-upload"
                    className={
                      isUplaodVisible
                        ? styles.customFileUpload
                        : styles.noneVisible
                    }
                  >
                    <FaFileUpload /> &nbsp;Upload File
                  </label>
                  <input
                    id="bg-image-upload"
                    type="file"
                    className={styles.fileUpload}
                    onChange={onBgImageSubmit}
                  /> */}

                {isUplaodVisible && (
                  <ButtonInput
                    inputType="file"
                    labelText="Upload file to CMS"
                    Icon={FaFileUpload}
                    onChange={onBgImageSubmit}
                    inputId="bgImage"
                  />
                )}

                {/* <label
                  htmlFor="chooseFile"
                  className={
                    !isUplaodVisible
                      ? styles.customFileUpload
                      : styles.noneVisible
                  }
                >
                  <FaFileUpload /> &nbsp;Choose File
                </label>
                <input
                  id="chooseFile"
                  type="file"
                  className={styles.imageFile}
                  onChange={onChangePicture}
                /> */}
                {!isUplaodVisible && (
                  <ButtonInput
                    inputType="file"
                    labelText="Upload file to CMS"
                    Icon={FaFileUpload}
                    onChange={onChangePicture}
                    inputId="bgChange"
                  />
                )}
                {/* </div> */}
              </form>
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
            <span className={styles.powered}>YG</span>
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
