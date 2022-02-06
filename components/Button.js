import cn from "classnames";
import styles from "./Button.module.scss";

const Button = ({ text, onClick, className, Icon: Icon }) => {
  return (
    <div className={cn(styles.ButtonWrapper, className)}>
      <label onClick={onClick} className={styles.Button}>
        {Icon && <Icon />} &nbsp;&nbsp;{text}
      </label>
    </div>
  );
};

export default Button;
