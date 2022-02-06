import MainContainer from "../components/MainContainer";
const userDashboard = () => {
  return (
    <div>
      <MainContainer
        pageName={"userDashboard"}
        header={"Personal area"}
        descriptionContent={"Personal area of Helixtip-top CMS"}
        isSettingsVisible={false}
        Content={() => {
          return <div></div>;
        }}
      />
    </div>
  );
};
export default userDashboard;
