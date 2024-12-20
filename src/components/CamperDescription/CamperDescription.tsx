import React from "react";
import { Camper as CamperForProps, Gallery } from "../../interfaces/interfaces";
import { FaStar } from "react-icons/fa";
import { CiMap } from "react-icons/ci";
import Loader from "../Loader/Loader";

interface CamperDescriptionProps {
  camper: CamperForProps;
}

const CamperDescription: React.FC<CamperDescriptionProps> = ({ camper }) => {
  if (!camper) return <Loader />;
  const { name, reviews, description, rating, location, price, gallery } =
    camper;

  return (
    <div className="container min-h-[100%]">
      <h4 className="font-semibold text-2xl">{name}</h4>
      <div className="flex flex-row mb-4 items-center">
        <FaStar className="h-[22.5px] fill-[orange] mr-[2px]" />
        <p className="underline text-sm mr-2">
          {rating}({reviews.length} Reviews)
        </p>
        <CiMap className="h-5" />
        <p className="text-sm">{location}</p>
      </div>
      <p className="font-semibold text-2xl">€{price}.00</p>
      <div className="flex flex-row flex-nowrap my-7  justify-between">
        <ul className="flex flex-row flex-nowrap gap-4">
          {gallery.map((item: Gallery, index: number) => {
            return (
              <img
                key={index}
                src={item.original}
                alt={name}
                className="h-[312px] object-fill"
                style={{
                  width: `calc((100% - ${(3 - 1) * 16}px) / ${3})`,
                }}
              />
            );
          })}
        </ul>
      </div>
      <p className="text-[#475467] text-base mb-8">{description}</p>
    </div>
  );
};

export default CamperDescription;
