import { useMain } from "../context/mainContext";
import MainContainer from "../components/MainContainer";

const Blog = () => {
  const { projectName } = useMain();
  const Content = () => {
    return <></>;
  };
  return (
    <>
      <MainContainer
        pageName={"blog"}
        header={"Blog page of " + projectName + " CMS!"}
        descriptionContent={"Blog page of helixtip.top CMS"}
        Content={Content}
        isSettingsVisible={false}
      />
      ;
    </>
  );
};
export default Blog;
