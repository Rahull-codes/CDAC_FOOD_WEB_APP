import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import { getFoodMenu } from "../services/FoodService";
import type { Food } from "../types/Food";

export const FoodMenuPage = () => {
  const [foodItems, setFoodItems] = useState<Food[]>([]);

  const handleFoodMenu = async () => {
    try {
      const response = await getFoodMenu();
      const data = response.data.data;
      setFoodItems(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    handleFoodMenu();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div
        className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-5
  "
      >
        {foodItems.map((e) => (
          <FoodCard food={e} />
        ))}
      </div>
    </div>
  );
};
