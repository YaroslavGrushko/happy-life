import MainContainer from "../components/MainContainer";
const adminDashboard = () => {
  return (
    <div>
      <MainContainer
        pageName={"adminDashboard"}
        header={"Admin personal area"}
        descriptionContent={"Personal area of Helixtip-top CMS"}
        isSettingsVisible={true}
        Content={() => {
          return <div></div>;
        }}
      />
    </div>
  );
};
export default adminDashboard;
