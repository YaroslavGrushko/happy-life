import cn from "classnames";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useMain } from "../context/mainContext";
import excel from "../public/images/excel.png";
import favicon from "../public/images/favicon.png";
import backgroundImage from "../public/images/background.png";
import { FaFileUpload } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import MainContainer from "../components/MainContainer";
import Button from "../components/Button";
import { ButtonUpload } from "../components/ButtonUpload";
import { ButtonDownload } from "../components/ButtonDownload";
import SettingsCard from "../components/SettingsCard";
import LocalizedStrings from "react-localization";
import settingsLocalizations from "../settings.json";
import * as localizationKeys from "../localizationKeys";

import styles from "./settings.module.scss";

export default function Settings() {
  const [frm_image, setImage] = useState(backgroundImage);
  const localizationsData = {
    default: settingsLocalizations,
  };
  const localizedStrings = new LocalizedStrings(localizationsData, {
    logsEnabled: false,
  });
  const onSettingsSubmit = (event) => {
    event.preventDefault();
    var body = new FormData();
    let files_to_upload = event.target.files;
    body.append("file", files_to_upload[0]);

    axios.post("/api/flask/excelCmsSettings", body).then((response) => {});
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

  const ResetToFactorySettings = () => {
    axios.post("/api/flask/resetToFactorySettings", {}).then((response) => {});
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
          <div className={styles.grid}>
            <SettingsCard title={"Settings"} imgSrc={excel}>
              <ButtonDownload
                className={styles.Download}
                labelText="Download settings from CMS"
                Icon={BiDownload}
                href={"/api/flask/setupDownload?x-access-token=" + token}
                onClick={downloadLinkOnclickHandler}
              />

              <ButtonUpload
                inputType="file"
                labelText="Upload settings to CMS"
                Icon={FaFileUpload}
                onChange={onSettingsSubmit}
                inputId="settings"
                className={styles.Upload}
              />

              <Button
                text={"Reset to factory settings"}
                Icon={GrPowerReset}
                className={styles.Button}
                onClick={ResetToFactorySettings}
              />
            </SettingsCard>

            <SettingsCard title={"Favicon"} imgSrc={favicon}>
              <form onSubmit={onFaviconSubmit}></form>
              <p>Upload Favicon</p>
              <ButtonUpload
                className={styles.Upload}
                inputType="file"
                labelText="Upload file to CMS"
                Icon={FaFileUpload}
                onChange={onFaviconSubmit}
                inputId="favicon"
              />
            </SettingsCard>

            <SettingsCard title={"Db"}>
              <p>download project database</p>
            </SettingsCard>

            <SettingsCard
              title={"Images"}
              imgSrc={frm_image}
              imageId="image"
              imageAlt="background"
            >
              <>
                <p>Upload background image</p>
                <form>
                  {isUplaodVisible && (
                    <ButtonUpload
                      className={styles.Upload}
                      inputType="file"
                      labelText="Upload file to CMS"
                      Icon={FaFileUpload}
                      onChange={onBgImageSubmit}
                      inputId="bgImage"
                    />
                  )}

                  {!isUplaodVisible && (
                    <ButtonUpload
                      className={styles.Upload}
                      inputType="file"
                      labelText="Upload file to CMS"
                      Icon={FaFileUpload}
                      onChange={onChangePicture}
                      inputId="bgChange"
                    />
                  )}
                </form>
              </>
            </SettingsCard>
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
      header={cn(localizedStrings[localizationKeys.CMS_NAME]) + " settings"}
      descriptionContent={"Settings page of helixtip.top CMS"}
    >
      <Content />
    </MainContainer>
  );
}
