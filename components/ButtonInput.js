import styles from "./ButtonInput.module.scss";

export const ButtonInput = ({
  inputId,
  inputType,
  labelText,
  Icon: Icon,
  onChange,
}) => {
  return (
    <>
      <div className={styles.ButtonInputWrapper}>
        <label htmlFor={inputId} className={styles.ButtonInput}>
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
