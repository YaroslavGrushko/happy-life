import styles from "./Button.module.scss";

export const ButtonDownload = ({ labelText, Icon: Icon, onClick, href }) => {
  return (
    <div className={styles.ButtonWrapper}>
      <a className={styles.Button} onClick={onClick} href={href}>
        <Icon /> &nbsp;{labelText}
      </a>
    </div>
  );
};
