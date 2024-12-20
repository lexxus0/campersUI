import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { lazy } from "react";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const CampersPage = lazy(() => import("./pages/CampersPage/CampersPage"));
const CamperDetailsPage = lazy(
  () => import("./pages/CamperDetailsPage/CamperDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App: React.FC = () => {
  return (
    <Layout>
      <main>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/campers" element={<CampersPage />} />
          <Route path="/campers/:id" element={<CamperDetailsPage />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </Layout>
  );
};

export default App;
