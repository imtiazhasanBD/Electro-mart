import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useFetchUserData from "../fetchUser";
import { useParams } from "react-router-dom";
import useFetchOrderData from "../fetchOrderData";

const UserDashboard = () => {
  const userInfo = useFetchUserData();
  const orderItems = useFetchOrderData();
  console.log(orderItems);

  return (
    <div className="w-full md:flex flex-col  bg-white hidden">
      <h1 className="text-2xl font-semibold text-blue-400 text-center">
        Manage My Account
      </h1>
      <div>
        <div className="w-full justify-between mt-10 flex flex-col md:flex-row gap-10">
          <section className="space-y-4 p-6 flex flex-col w-full rounded-lg shadow-lg">
            <div className="flex justify-between text-lg font-semibold">
              <span>Personal Profile</span>
              <button className="text-blue-500 text-base hidden">Edit</button>
            </div>
            <div className="text-gray-500">
              <p>{userInfo?.firstName + " " + userInfo?.lastName}</p>
              <p>{userInfo?.email}</p>
              <p>{userInfo?.phone || "No Number Provided"}</p>
            </div>
          </section>
          <section className="space-y-4 p-6 flex flex-col justify-between w-full rounded-lg shadow-lg">
            <div className="flex justify-between text-lg font-semibold">
              <span>Billing Address</span>
              <button className="text-blue-500 text-base hidden">Edit</button>
            </div>
            <div className="text-gray-500">
              <p>
                {userInfo?.addressInfo?.billing?.address ||
                  "No address provided"}
              </p>
              <p>
                {userInfo?.addressInfo?.billing?.zone || "No zone provided"}
              </p>
              <p>
                {userInfo?.addressInfo?.billing?.city || "No city provided"}
              </p>
              <p>
                {userInfo?.addressInfo?.billing?.region || "No region provided"}
              </p>
            </div>
          </section>
          <section className="space-y-4 p-6 flex flex-col justify-between w-full rounded-lg shadow-lg">
            <div className="flex justify-between text-lg font-semibold">
              <span>Shipping Address</span>
              <button className="text-blue-500 text-base hidden">Edit</button>
            </div>
            <div className="text-gray-500">
              <p>
                {userInfo?.addressInfo?.shipping?.address ||
                  "No address provided"}
              </p>
              <p>
                {userInfo?.addressInfo?.shipping?.zone || "No zone provided"}
              </p>
              <p>
                {userInfo?.addressInfo?.shipping?.city || "No city provided"}
              </p>
              <p>
                {userInfo?.addressInfo?.shipping?.region ||
                  "No region provided"}
              </p>
            </div>
          </section>
        </div>
        {orderItems && orderItems.length > 0 ? (
          <div className="mt-8 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2 text-blue-500">
              Recent Orders History
            </h2>
            <table className="table-auto w-full border border-gray-300 mt-8">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((order) => (
                  <tr key={order.paymentId} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">
                      {order.paymentId.substring(0, 30) + "..."}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(order.createdAt?.toDate()).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {order.orderItems
                        .reduce(
                          (total, product) =>
                            total +
                            (product.price -
                              (product.price / 100) *
                                product.discountPercentage),
                          0
                        )
                        .toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">Deliverd</td>
                  </tr>
                ))}
                {orderItems.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-2">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-10">
            No orders yet. Browse and add some!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
