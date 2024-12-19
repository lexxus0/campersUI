import { FaStar } from "react-icons/fa6";
import { Reviews as IReviews } from "../../interfaces/interfaces";
import { selectCamper } from "../../redux/campers/selectors";
import { useAppSelector } from "../../redux/tools/hooks";

const Reviews: React.FC = () => {
  const camper = useAppSelector(selectCamper);

  const renderStars = (stars: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={`h-4 w-4 ${
              index < stars ? "fill-[orange]" : "fill-[#dadde1]"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-[631px] flex gap-11 flex-col">
      {camper.reviews.map((review: IReviews) => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <p className="flex justify-center items-center w-[60px] h-[60px] bg-[#f2f4f7] font-semibold text-2xl leading-[133%] text-[#e44848] rounded-[60px] text-center mb-1">
                {review.reviewer_name[0]}
              </p>
              <div className="flex flex-col">
                <p>{review.reviewer_name}</p>
                {renderStars(review.reviewer_rating)}
              </div>
            </div>
            <p className="text-[#475467]">{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
