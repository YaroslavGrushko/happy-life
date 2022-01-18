import cn from "classnames";
import styles from "./TitleCard.module.scss";

export const TitleCard = ({ text, className, message }) => {
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
    <div className={cn(messageClassName, className)}>
      <h1>{text}</h1>
    </div>
  );
};
