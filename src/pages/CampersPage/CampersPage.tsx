import CampersList from "../../components/CampersList/CampersList";
import SideFilterBar from "../../components/SideFilterBar/SideFilterBar";

const CampersPage = () => {
  return (
    <div className="container flex gap-16">
      <SideFilterBar />
      <CampersList />
    </div>
  );
};

export default CampersPage;
