import { Camper as CamperProps } from "../../interfaces/interfaces";
import { CiHeart, CiMap } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import Categories from "../Categories/Categories";
import { Link, useLocation } from "react-router-dom";
import { toggleFavorite } from "../../redux/favorites/slice";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../redux/tools/hooks";

const Camper: React.FC<CamperProps> = ({
  id,
  name,
  description,
  price,
  kitchen,
  AC,
  TV,
  bathroom,
  radio,
  refrigerator,
  microwave,
  gas,
  water,
  engine,
  transmission,
  rating,
  location,
  reviews,
  gallery,
}) => {
  const Location = useLocation();
  const dispatch = useAppDispatch();

  const favorites = useAppSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.includes(id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="w-[888px] flex flex-row content-start border p-6 rounded-[20px] border-solid border-[#dadde1] gap-6">
      <div>
        <img
          src={gallery[0].thumb}
          alt="Campers picture"
          className="w-[320px] h-[340px] rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col w-[525px]">
        <div className="flex flex-row justify-between  font-semibold text-2xl leading-[133%] text-[#101828] mb-2">
          <p>{name}</p>
          <p className="flex flex-row gap-3">
            €{price}.00
            <CiHeart
              onClick={handleFavoriteClick}
              className="w-8 h-8 cursor-pointer"
              color={isFavorite ? "red" : "black"}
            />
          </p>
        </div>
        <div className="flex flex-row mb-6 items-center">
          <FaStar className="h-[22.5px] fill-[orange] mr-[2px]" />
          <p className="underline text-sm mr-2">
            {rating}({reviews.length} Reviews)
          </p>
          <CiMap className="h-5" />
          <p className="text-sm">{location}</p>
        </div>
        <p className="text-sm text-[#475467] truncate mb-6">{description}</p>
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
        <Link to={`/campers/${id}`} state={{ from: Location }}>
          <Button>Show more</Button>
        </Link>
      </div>
    </div>
  );
};

export default Camper;
