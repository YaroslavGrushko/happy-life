import cn from "classnames";
import styles from "./TitleCard.module.scss";
import LocalizedStrings from "react-localization";
import settingsLocalizations from "../settings.json";
import * as localizationKeys from "../localizationKeys";

export const TitleCard = ({ text, className, message }) => {
  const localizationsData = {
    default: settingsLocalizations,
  };
  const localizedStrings = new LocalizedStrings(localizationsData, {
    logsEnabled: false,
  });
  let messageClassName;
  switch (message) {
    case "error":
      messageClassName = styles.ErrorTitleCard;
      break;
    case "warning":
      messageClassName = styles.WarningTitleCard;
      break;
    default:
      messageClassName = styles.TitleCard;
  }

  return (
    <div
      className={cn(messageClassName, className)}
      style={{
        backgroundColor: cn(
          localizedStrings[localizationKeys.TITLE_BACKGROUND_COLOR]
        ),
        color: cn(localizedStrings[localizationKeys.TITLE_TEXT_COLOR]),
      }}
    >
      <h1>{text}</h1>
    </div>
  );
};
