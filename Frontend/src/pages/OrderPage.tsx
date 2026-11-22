import { useEffect, useState } from "react";
import { orderHistory } from "../services/OrderService";
import type { Order } from "../types/Order";

const OrderPage = () => {

    const [orders , setOrders]  = useState<Order[]>([])

    const orderHistoryDetails = async () =>{
        const response = await orderHistory()
        const result = response.data
        setOrders(result.data)
        // console.log(result.data)
    }

    useEffect(() => {
      orderHistoryDetails()
    }, [ ])

    return (
        <div className="min-h-screen  px-4 py-10 sm:px-8">

            <div className="max-w-6xl mx-auto">

                {/* PAGE HEADER */}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold ">
                        My Orders
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and track your previous orders.
                    </p>
                </div>


                {/* ORDER COUNT */}

                <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
                    <p className="text-gray-500 text-sm">
                        Total Orders
                    </p>

                    <h2 className="text-2xl font-bold mt-1 text-black">
                        {orders.length}
                    </h2>
                </div>


                {/* ORDERS TABLE */}

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="table w-full">

                            <thead>
                                <tr className="bg-gray-100 text-gray-600">
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Order Time</th>
                                    <th>Delivery Date</th>
                                    <th className="text-right">Total Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {orders.map(order=> (
                                  
                                    <tr key={order.oid} className="hover:bg-gray-50 text-black">

                                        <td className="font-semibold">
                                            #{order.oid}
                                        </td>

                                        <td>
                                            {order.odate.split("T")[0]}
                                        </td>

                                        <td>
                                            {order.odate.split("T")[1]}
                                        </td>

                                        <td>
                                            {order.deldate ?? "Pending"}
                                        </td>

                                        <td className="text-right font-semibold">
                                            ₹{order.total_amount}
                                        </td>

                                        <td>
                                            {order.deldate ? (
                                                <span className="badge badge-success badge-outline">
                                                    Delivered
                                                </span>
                                            ) : (
                                                <span className="badge badge-warning badge-outline">
                                                    Processing
                                                </span>
                                            )}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default OrderPage
