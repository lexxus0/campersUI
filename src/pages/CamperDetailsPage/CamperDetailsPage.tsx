import { useAppDispatch, useAppSelector } from "../../redux/tools/hooks";
import { useEffect, useState } from "react";
import { fetchCamperById } from "../../redux/campers/operations";
import { useParams } from "react-router-dom";
import { selectCamper } from "../../redux/campers/selectors";
import CamperDescription from "../../components/CamperDescription/CamperDescription";
import Features from "../../components/Features/Features";
import Reviews from "../../components/Reviews/Reviews";
import CamperForm from "../../components/Form/Form";

const CamperDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState<"features" | "reviews">(
    "features"
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, id]);

  const camper = useAppSelector(selectCamper);

  return (
    <div>
      <CamperDescription camper={camper} />
      <div className="max-w-[1300px] mx-auto border-b border-gray-300 flex mb-6">
        <button
          className={`font-semibold text-xl text-center relative pb-6 mr-10`}
          onClick={() => setCurrentTab("features")}
        >
          Features
          {currentTab === "features" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500"></span>
          )}
        </button>
        <button
          className={`font-semibold text-xl text-center relative pb-6`}
          onClick={() => setCurrentTab("reviews")}
        >
          Reviews
          {currentTab === "reviews" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500"></span>
          )}
        </button>
      </div>

      <div className="container flex gap-10">
        {currentTab === "features" && <Features />}
        {currentTab === "reviews" && <Reviews />}
        <CamperForm />
      </div>
    </div>
  );
};

export default CamperDetailsPage;
