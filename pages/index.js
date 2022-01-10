import { useMain } from "../context/mainContext";
import MainContainer from "../containers/MainContainer";
import styles from "./home.module.scss";
const Home = () => {
  const { projectName } = useMain();

  return (
    <div>
      <MainContainer
        pageName={"home"}
        descriptionContent={"Home page of Helixtip-top CMS"}
        Content={() => {
          return (
            <div className={styles.Container}>
              <h1 className={styles.title}>Welcome to {projectName} CMS!</h1>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Home;
