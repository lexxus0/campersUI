import {
  FaUtensils,
  FaSnowflake,
  FaTv,
  FaShower,
  FaIceCream,
  FaGasPump,
  FaWater,
} from "react-icons/fa";
import { GiGasStove } from "react-icons/gi";
import { FaRadio } from "react-icons/fa6";
import { LuMicrowave } from "react-icons/lu";
import {
  TbAutomaticGearboxFilled,
  TbManualGearboxFilled,
} from "react-icons/tb";
import { BsFuelPumpDieselFill } from "react-icons/bs";
import { Camper } from "../../interfaces/interfaces";

const Categories: React.FC<Partial<Camper>> = ({
  kitchen,
  AC,
  TV,
  bathroom,
  engine,
  transmission,
  radio,
  refrigerator,
  gas,
  water,
  microwave,
}) => {
  const categories = [
    {
      label: "Transmission",
      value: transmission,
      icon:
        transmission === "automatic" ? (
          <TbAutomaticGearboxFilled />
        ) : (
          <TbManualGearboxFilled />
        ),
      text: transmission === "automatic" ? "Automatic" : "Manual",
    },
    {
      label: "Engine",
      value: engine,
      icon: engine === "petrol" ? <FaGasPump /> : <BsFuelPumpDieselFill />,
      text: engine === "petrol" ? "Petrol" : "Diesel",
    },
    { label: "Kitchen", value: kitchen, icon: <FaUtensils /> },
    { label: "AC", value: AC, icon: <FaSnowflake /> },
    { label: "TV", value: TV, icon: <FaTv /> },
    { label: "Bathroom", value: bathroom, icon: <FaShower /> },
    { label: "Radio", value: radio, icon: <FaRadio /> },
    { label: "Refrigerator", value: refrigerator, icon: <FaIceCream /> },
    { label: "Microwave", value: microwave, icon: <LuMicrowave /> },
    { label: "Gas", value: gas, icon: <GiGasStove /> },
    { label: "Water", value: water, icon: <FaWater /> },
  ];
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories
        .filter((category) => category.value)
        .map((category) => (
          <div
            key={category.label}
            className="flex flex-row gap-[2px] px-[18px] py-3 rounded-[100px] bg-[#f2f4f7] mix-blend-multiply items-center"
            aria-label={category.label}
          >
            <span>{category.icon}</span>
            <span className="font-medium text-base text-center">
              {category.text || category.label}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Categories;
