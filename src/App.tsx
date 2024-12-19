import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import CampersPage from "./pages/CampersPage/CampersPage";
import CamperDetailsPage from "./pages/CamperDetailsPage/CamperDetailsPage";

const App: React.FC = () => {
  return (
    <Layout>
      <main>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/campers" element={<CampersPage />} />
          <Route path="/campers/:id" element={<CamperDetailsPage />} />
        </Routes>
      </main>
    </Layout>
  );
};

export default App;
