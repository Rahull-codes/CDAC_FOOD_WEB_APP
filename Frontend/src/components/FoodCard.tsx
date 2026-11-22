import type { Food } from "../types/Food";
import { Config } from "../utils/config";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../slices/CartSlices";
const FoodCard = ({ food } : {food :Food}) => {

  const dispatch = useDispatch()
  const handleAddToCart = () =>{
    dispatch(addToCartAction({ ...food , qty : 1 }))

  }

  return (
    <div className="card bg-base-100 w-full shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden ">

      {/* Food Image */}
      <figure className="w-full aspect-4/3 overflow-hidden">
        <img
          src={`${Config.URL}/${food.image}`}
          alt={food.name}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Content */}
      <div className="card-body p-4 sm:p-5 bg-gray-700">

        <h2 className="card-title text-lg sm:text-xl capitalize">
          {food.name}
        </h2>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {food.description}
        </p>

        <div className="card-actions justify-between items-center mt-3">

          <span className="text-lg font-bold text-primary">
            Rs. {food.price}
          </span>

          <button className="btn btn-primary btn-sm sm:btn-md" onClick={handleAddToCart}>
            Add to cart
          </button>

        </div>
      </div>
    </div>
  );
};

export default FoodCard;

