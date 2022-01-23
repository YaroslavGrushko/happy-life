import cn from "classnames";
import Image from "next/image";
import styles from "./SettingsCard.module.scss";
import LocalizedStrings from "react-localization";
import settingsLocalizations from "../settings.json";
import * as localizationKeys from "../localizationKeys";

const SettingsCard = ({ children, title, imgSrc, imageId, imageAlt }) => {
  const localizationsData = {
    default: settingsLocalizations,
  };
  const localizedStrings = new LocalizedStrings(localizationsData, {
    logsEnabled: false,
  });
  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: cn(
          localizedStrings[localizationKeys.CARD_BACKGROUND_COLOR]
        ),
      }}
    >
      <h2>{title} &rarr;</h2>
      {imgSrc && (
        <Image
          id={imageId}
          alt={imageAlt}
          src={imgSrc}
          alt="excel"
          layout="responsive"
          objectFit="contain"
          width={400}
          height={300}
        />
      )}
      {children}
    </div>
  );
};
export default SettingsCard;
