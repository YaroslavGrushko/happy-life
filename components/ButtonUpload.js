import cn from "classnames";
import styles from "./Button.module.scss";

export const ButtonUpload = ({
  inputId,
  inputType,
  labelText,
  Icon: Icon,
  onChange,
  className,
}) => {
  return (
    <>
      <div className={cn(styles.ButtonWrapper, className)}>
        <label htmlFor={inputId} className={styles.Button}>
          <Icon /> &nbsp;&nbsp;{labelText}
        </label>
      </div>

      <input
        id={inputId}
        type={inputType}
        className={styles.inputStyle}
        onChange={onChange}
      />
    </>
  );
};
