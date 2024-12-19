import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  FaIceCream,
  FaRadio,
  FaShower,
  FaSnowflake,
  FaTv,
  FaUtensils,
  FaWater,
} from "react-icons/fa6";
import { GiGasStove } from "react-icons/gi";
import { LuMicrowave } from "react-icons/lu";
import { BsGrid1X2, BsGrid, BsGrid3X3Gap } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux/tools/hooks";
import { CiMap } from "react-icons/ci";
import { fetchCampers } from "../../redux/campers/operations";
import { clearCampers } from "../../redux/campers/slice";
import { resetFilters, setFilters } from "../../redux/filters/slice";
import { selectFilters } from "../../redux/filters/selectors";

const SideFilterBar = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const [selectedFilters, setSelectedFilters] = useState({
    location: searchParams.get("location") || filters.location,
    equipment: searchParams.get("equipment")
      ? searchParams.get("equipment")!.split(",")
      : filters.equipment,
    form: searchParams.get("form") || filters.form,
  });

  const limit = 4;

  const locations = [
    "Ukraine, Kyiv",
    "Ukraine, Poltava",
    "Ukraine, Dnipro",
    "Ukraine, Odesa",
    "Ukraine, Kharkiv",
    "Ukraine, Sumy",
    "Ukraine, Lviv",
  ];

  const equipment = [
    { id: 1, label: "Kitchen", icon: <FaUtensils /> },
    { id: 2, label: "AC", icon: <FaSnowflake /> },
    { id: 3, label: "TV", icon: <FaTv /> },
    { id: 4, label: "Bathroom", icon: <FaShower /> },
    { id: 5, label: "Radio", icon: <FaRadio /> },
    { id: 6, label: "Refrigerator", icon: <FaIceCream /> },
    { id: 7, label: "Microwave", icon: <LuMicrowave /> },
    { id: 8, label: "Gas", icon: <GiGasStove /> },
    { id: 9, label: "Water", icon: <FaWater /> },
  ];

  const types = [
    { id: 10, label: "Panel", value: "panelTruck", icon: <BsGrid1X2 /> },
    { id: 20, label: "Integrated", value: "fullyIntegrated", icon: <BsGrid /> },
    { id: 30, label: "Alcove", value: "alcove", icon: <BsGrid3X3Gap /> },
  ];

  const updateFilters = (key: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    dispatch(resetFilters());
    dispatch(setFilters(selectedFilters));
    dispatch(clearCampers());
    dispatch(
      fetchCampers({ filters: selectedFilters, page: currentPage, limit })
    );

    setSearchParams({
      location: selectedFilters.location || "",
      equipment: selectedFilters.equipment.join(","),
      type: selectedFilters.form || "",
      page: currentPage.toString(),
      limit: limit.toString(),
    });
  };

  const handleReset = () => {
    const defaultFilters = { location: "", equipment: [], form: "" };
    setSelectedFilters(defaultFilters);
    setCurrentPage(1);

    dispatch(resetFilters());
    dispatch(clearCampers());
    dispatch(fetchCampers({ filters: defaultFilters, page: 1, limit }));

    setSearchParams({
      location: "",
      equipment: "",
      form: "",
      page: "1",
    });
  };

  useEffect(() => {
    dispatch(
      fetchCampers({ filters: selectedFilters, page: currentPage, limit })
    );
  }, [dispatch, currentPage]);

  return (
    <div className="flex flex-col w-[360px]">
      <label className="flex flex-col gap-2 text-[#6c717b] mb-10">
        Location
        <div className="relative">
          <CiMap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#32353b] h-6 w-6" />
          <select
            value={selectedFilters.location}
            onChange={(e) => updateFilters("location", e.target.value)}
            className="pl-12 w-[360px] pr-10 py-[18px] rounded-xl bg-[#f7f7f7] border border-[#ddd] focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
            }}
          >
            <option value="">Select location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </label>
      <p className="font-medium text-[#6c717b] mb-8">Filters</p>
      <p className="font-semibold text-xl text-[#101828] relative after:content-[''] after:block after:h-[1px] after:w-full after:bg-[#dadde1] after:my-6">
        Vehicle equipment
      </p>
      <div className="flex flex-wrap gap-3 mb-8">
        {equipment.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer w-[112px] h-24 ${
              selectedFilters.equipment.includes(item.label)
                ? "border-red-500"
                : "border-gray-300"
            }`}
            onClick={() =>
              updateFilters(
                "equipment",
                selectedFilters.equipment.includes(item.label)
                  ? selectedFilters.equipment.filter(
                      (eq: string) => eq !== item.label
                    )
                  : [...selectedFilters.equipment, item.label]
              )
            }
          >
            <span className="text-2xl mb-2">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="font-semibold text-xl text-[#101828] relative after:content-[''] after:block after:h-[1px] after:w-full after:bg-[#dadde1] after:my-6">
        Vehicle type
      </p>
      <div className="flex flex-wrap gap-3 mb-8">
        {types.map((type) => (
          <div
            key={type.id}
            className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer w-[112px] h-24 ${
              selectedFilters.form === type.value
                ? "border-red-500"
                : "border-gray-300"
            }`}
            onClick={() => updateFilters("form", type.value)}
          >
            <span className="text-2xl mb-2">{type.icon}</span>
            <span className="font-medium">{type.label}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          className="bg-red-500 py-4 w-[170px] rounded-[200px] font-medium text-base text-white transition-all duration-[0.7] ease-[ease-out] hover:bg-red-700"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-blue-500 py-4 w-[170px] rounded-[200px] font-medium text-base text-white transition-all duration-[0.7] ease-[ease-out] hover:bg-blue-700"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SideFilterBar;
