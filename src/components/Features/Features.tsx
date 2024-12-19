import { selectCamper } from "../../redux/campers/selectors";
import { useAppSelector } from "../../redux/tools/hooks";
import Categories from "../Categories/Categories";
import Loader from "../Loader/Loader";

const Features = () => {
  const camper = useAppSelector(selectCamper);
  if (!camper) return <Loader />;

  const {
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
    width,
    height,
    length,
    form,
    tank,
    consumption,
  } = camper;

  const details = [
    { label: "Form", value: form },
    { label: "Length", value: length },
    { label: "Width", value: width },
    { label: "Height", value: height },
    { label: "Tank", value: tank },
    { label: "Consumption", value: consumption },
  ];

  return (
    <div className="w-[631px]  px-20 py-11 rounded-[10px] bg-[#f7f7f7] flex flex-col">
      <Categories
        kitchen={kitchen}
        AC={AC}
        TV={TV}
        bathroom={bathroom}
        radio={radio}
        refrigerator={refrigerator}
        microwave={microwave}
        gas={gas}
        water={water}
        engine={engine}
        transmission={transmission}
      />
      <p className="font-semibold text-xl mt-[76px] relative after:content-[''] after:block after:h-[1px] after:w-full after:bg-[#dadde1] after:my-6">
        Vehicle details
      </p>
      <div>
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between">
            <p className="mb-4">{detail.label}</p>
            <p>{detail.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
