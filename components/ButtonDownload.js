import cn from "classnames";
import styles from "./Button.module.scss";

export const ButtonDownload = ({
  labelText,
  Icon: Icon,
  onClick,
  href,
  className,
}) => {
  return (
    <div className={cn(styles.ButtonWrapper, className)}>
      <a className={styles.Button} onClick={onClick} href={href}>
        <Icon /> &nbsp;&nbsp; {labelText}
      </a>
    </div>
  );
};
