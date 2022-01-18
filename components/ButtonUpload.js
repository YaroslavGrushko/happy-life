import styles from "./Button.module.scss";

export const ButtonUpload = ({
  inputId,
  inputType,
  labelText,
  Icon: Icon,
  onChange,
}) => {
  return (
    <>
      <div className={styles.ButtonWrapper}>
        <label htmlFor={inputId} className={styles.Button}>
          <Icon /> &nbsp;{labelText}
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
