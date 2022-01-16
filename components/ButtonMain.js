import cn from "classnames";
import styles from "./ButtonMain.module.scss";

export const ButtonMain = ({ text, onClick, className }) => {
  return (
    <div className={cn(styles.ButtonMainWrapper, className)}>
      <label onClick={onClick} className={styles.ButtonMain}>
        {text}
      </label>
    </div>
  );
};
