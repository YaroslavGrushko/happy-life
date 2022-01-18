import cn from "classnames";
import styles from "./Button.module.scss";

export const Button = ({ text, onClick, className }) => {
  return (
    <div className={cn(styles.ButtonWrapper, className)}>
      <label onClick={onClick} className={styles.Button}>
        {text}
      </label>
    </div>
  );
};
