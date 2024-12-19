import React, { useState, useEffect } from "react";
import CamperCard from "../Camper/Camper";
import { useAppDispatch, useAppSelector } from "../../redux/tools/hooks";
import {
  selectCampers,
  selectIsLoading,
  selectTotalItems,
} from "../../redux/campers/selectors";
import { Camper } from "../../interfaces/interfaces";
import Loader from "../Loader/Loader";
import { useSearchParams } from "react-router-dom";
import { fetchCampers } from "../../redux/campers/operations";
import { selectFilters } from "../../redux/filters/selectors";

const CampersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const campers = useAppSelector(selectCampers);
  const isLoading = useAppSelector(selectIsLoading);
  const totalItems = useAppSelector(selectTotalItems);
  const filters = useAppSelector(selectFilters);
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const limit = 4;
  const totalPages = Math.ceil(totalItems / limit);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const [activeCategory, setActiveCategory] = useState<"all" | "favorites">(
    (searchParams.get("category") as "all" | "favorites") || "all"
  );

  const [selectedFilters] = useState({
    location: searchParams.get("location") || filters.location,
    equipment: searchParams.get("equipment")
      ? searchParams.get("equipment")!.split(",")
      : filters.equipment,
    form: searchParams.get("form") || filters.form,
  });

  useEffect(() => {
    dispatch(
      fetchCampers({ filters: selectedFilters, page: currentPage, limit })
    );
  }, [dispatch, selectedFilters, currentPage]);

  const filteredCampers =
    activeCategory === "all"
      ? campers
      : campers.filter((camper: Camper) => favorites.includes(camper.id));

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      setSearchParams((prev) => ({
        ...Object.fromEntries(prev.entries()),
        page: nextPage.toString(),
        limit: limit.toString(),
      }));

      setTimeout(() => {
        const scrollHeight = 500;
        window.scrollBy({
          top: scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    }
  };

  const handleCategoryChange = (category: "all" | "favorites") => {
    setActiveCategory(category);
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev.entries()),
      category,
    }));
  };

  if (isLoading && campers.length === 0) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-[100vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 relative mt-1">
      <p className="text-right absolute top-[-27px] left-3 flex gap-1">
        <button
          className={`cursor-pointer ${
            activeCategory === "all" ? "text-red-500" : "text-gray-400"
          }`}
          onClick={() => handleCategoryChange("all")}
        >
          All
        </button>
        <span className="text-gray-300">|</span>
        <button
          className={`cursor-pointer ${
            activeCategory === "favorites" ? "text-red-500" : "text-gray-400"
          }`}
          onClick={() => handleCategoryChange("favorites")}
        >
          Favorites
        </button>
      </p>
      {isLoading && campers.length === 0 ? (
        <div className="flex justify-center items-center h-[100vh] w-[100vh]">
          <Loader />
        </div>
      ) : activeCategory === "favorites" && favorites.length === 0 ? (
        <div className="flex justify-center w-[100vh]">
          <p className="text-xl font-medium">
            Your favorites list is empty. Add campers to favorites to see them
            here.
          </p>
        </div>
      ) : filteredCampers.length > 0 ? (
        <>
          {filteredCampers.map((camper: Camper) => (
            <CamperCard
              key={camper.id}
              id={camper.id}
              name={camper.name}
              description={camper.description}
              price={camper.price}
              kitchen={camper.kitchen}
              AC={camper.AC}
              TV={camper.TV}
              bathroom={camper.bathroom}
              radio={camper.radio}
              refrigerator={camper.refrigerator}
              microwave={camper.microwave}
              gas={camper.gas}
              water={camper.water}
              engine={camper.engine}
              transmission={camper.transmission}
              rating={camper.rating}
              location={camper.location}
              reviews={camper.reviews}
              gallery={camper.gallery}
              form={""}
              length={""}
              width={""}
              height={""}
              tank={""}
              consumption={""}
            />
          ))}
          <div className="flex justify-center mt-6">
            {isLoading ? (
              <Loader />
            ) : (
              activeCategory === "all" && (
                <button
                  className="border px-8 py-4 rounded-[200px] border-solid transition-all ease-out duration-700 border-[#dadde1] hover:border-[#d84343] cursor-pointer disabled:cursor-not-allowed"
                  onClick={handleLoadMore}
                  disabled={currentPage >= totalPages}
                >
                  Load more
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center w-[100vh]">
          <p className="text-xl font-medium">
            {activeCategory === "favorites"
              ? "Sorry! You do not have anything here yet."
              : "Sorry! No campers matching your search query."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CampersList;
