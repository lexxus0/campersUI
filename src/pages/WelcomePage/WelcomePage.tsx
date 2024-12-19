import { NavLink } from "react-router-dom";
import img from "../../images/welcome.png";
import img2x from "../../images/welcome2x.png";
import Button from "../../components/Button/Button";

const isRetina = window.devicePixelRatio > 1;
const background = isRetina ? img2x : img;

const WelcomePage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="min-h-screen w-full bg-no-repeat bg-cover bg-center flex flex-col justify-center overflow-hidden"
    >
      <div className="flex flex-col items-start pl-16">
        <h2 className="text-5xl text-[#f7f7f7] font-semibold mb-4">
          Campers of your dreams
        </h2>
        <p className="font-semibold text-base leading-[133%] text-white mb-10">
          You can find everything you want in our catalog
        </p>
        <NavLink to="/campers">
          <Button>View Now</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default WelcomePage;
