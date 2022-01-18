import { useMain } from "../context/mainContext";
import MainContainer from "../components/MainContainer";
const Home = () => {
  const { projectName } = useMain();

  return (
    <div>
      <MainContainer
        pageName={"home"}
        header={"Welcome to " + projectName + " CMS!"}
        descriptionContent={"Home page of Helixtip-top CMS"}
        isSettingsVisible={false}
        Content={() => {
          return <div></div>;
        }}
      />
    </div>
  );
};

export default Home;
