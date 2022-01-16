import styles from "./ButtonDownload.module.scss";

export const ButtonDownload = ({ labelText, Icon: Icon, onClick, href }) => {
  return (
    <div className={styles.ButtonDownloadWrapper}>
      <a className={styles.ButtonDownload} onClick={onClick} href={href}>
        <Icon /> &nbsp;{labelText}
      </a>
    </div>
  );
};
