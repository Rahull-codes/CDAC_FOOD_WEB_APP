import { useDispatch, useSelector } from "react-redux";
import CartCard from "../components/CartCard";
import type { StoreType } from "../../store";
import { useEffect, useState } from "react";
import { placeOrder } from "../services/OrderService";
import { toast } from "react-toastify";
import { clearCartAction } from "../../slices/CartSlices";

export const CartPage = () => {
  const dispatch = useDispatch()
  const foodItems = useSelector(
    (store: StoreType) => store.cartReducer.cartItem,
  );

  const [bill, setBill] = useState(0);

  const calculateBill = () => {
    let price = 0;
    for (let f of foodItems) {
      price += f.price * f.qty;
    }
    setBill(price);
  };

  const handlePlaceOrder = async ()  => {
    const response = await placeOrder(bill , foodItems)
    const data = response.data
    if(data.status = 'success'){
      toast.success('Order placed ')
      dispatch(clearCartAction())
    }else{
      toast.success('Order fail Try again ')
    }
  }

  useEffect(() => {
    calculateBill();
  }, [foodItems]);

  return (
    
    foodItems.length  == 0 ? <h1 className="w-full flex justify-center items-center text-2xl font-bold">Your cart is Empty :)</h1> :
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* LEFT SIDE - CART */}

          <div>
            <div className="flex justify-between items-center pb-8 border-b">
              <h1 className="text-3xl font-bold">Your Cart</h1>

              <p className="text-gray-500">{foodItems.length} Items in cart</p>
            </div>

            {/* ALL CART ITEMS */}

            {foodItems.map((e) => (
              <CartCard key={e.fid} food={e} />
            ))}
          </div>

          {/* RIGHT SIDE - BILL SUMMARY */}

          <div className="lg:sticky lg:top-8 self-start">
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
              <div className="flex justify-between py-5 border-b text-gray-600">
                <span>Subtotal</span>
                <span>₹{bill}</span>
              </div>

              <div className="flex justify-between py-5 border-b text-gray-600">
                <span>Tax (GST)</span>
                <span>7%</span>
              </div>

              <div className="flex justify-between py-7 text-lg font-bold text-gray-700">
                <span>Total</span>
                <span>₹{(bill * 1.07).toFixed(2)}</span>
              </div>

              <button  
              onClick={handlePlaceOrder}
              className="btn bg-[#191919] hover:bg-black text-white border-none w-full h-16 rounded-lg">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};
