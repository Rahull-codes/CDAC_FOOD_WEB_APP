import { useDispatch } from "react-redux";
import type {CartItem} from "../types/Food";
import { Config } from "../utils/config";
import { decrementQtyAction, incrementQtyAction } from "../../slices/CartSlices";


const CartCard = ({food}: {food: CartItem}) => {

    const dispatch = useDispatch()

  return (

          <div className="lg:col-span-2">
            
            {/* PRODUCT */}

            <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr_auto_auto] gap-5 items-center py-8 border-b">
              {/* IMAGE */}

              <div className="w-20 h-20 sm:w-20 sm:h-20">
                <img
                  src={`${Config.URL + '/' + food.image}`}
                  alt={food.name}
                  className="w-full h-full object-contain bg-none"
                />
              </div>

              {/* DETAILS */}
              <div>
                <h2 className="font-bold text-lg capitalize">{food.name}</h2>

                <p className="text-gray-500 mt-2">{food.description}</p>
              </div>

              {/* QUANTITY */}

              <div className="flex items-center border rounded-md h-10">
                <button className="px-3 hover:bg-base-300" onClick={() =>  dispatch(decrementQtyAction(food.fid)) }><i className="ri-subtract-line "></i></button>

                <span className="px-2">{food.qty}</span>

                <button className="px-3 hover:bg-base-300 " onClick={() => dispatch(incrementQtyAction(food.fid))}><i className="ri-add-large-line "></i></button>
              </div>

              {/* PRICE */}

              <p className="font-bold whitespace-nowrap">
                ₹{food.price}
              </p>
            </div>
          </div>
  );
};

export default CartCard;
