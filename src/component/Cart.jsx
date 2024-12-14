import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);
  const cartItem = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed right-0 top-0 w-full lg:w-[20vw] bg-white h-full p-5 mb-3 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center my-3">
          <span className="text-xl font-bold text-gray-800">My Order</span>
          <IoMdClose
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 border-gray-600 text-gray-600 font-bold p-1 
          text-xl rounded-md hover:text-red-300 hover:border-red-300 cursor-pointer"
          />
        </div>

        {cartItem.length > 0 ? (
          cartItem.map((item) => {
            return (
              <CartItem
                key={item?.id}
                id={item?.id}
                img={item?.img}
                name={item?.name}
                price={item?.price}
                qty={item?.qty}
              />
            );
          })
        ) : (
          <h2 className="text-center text-xl text-gray-800 font-bold">
            Your card is empty...
          </h2>
        )}

        <div className="absolute bottom-0 ">
          <h3 className="font-semibold text-gray-800">
            Items :{" "}
            {cartItem.reduce((totalQty, item) => totalQty + item.qty, 0)}
          </h3>
          <h3 className="font-semibold text-gray-800">
            Total Amount :{" "}
            {cartItem.reduce(
              (totalTotal, item) => totalTotal + item.qty * item.price,
              0
            )}
          </h3>
          <hr className="w-[90vw] lg:w-[18vw] my-2" />
          <button
            className="bg-green-500 font-bold p-3 py-2 text-white rounded-lg w-[90vw] 
          lg:w-[18vw] mb-5"
          onClick={()=>{navigate('/success')}}
          >
            Checkout
          </button>
        </div>
      </div>
      <FaShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full bg-green-500 text-white shadow-md text-5xl p-3 fixed bottom-4 right-4  ${
          cartItem.length <= 0 && "animate-bounce delay-500 transition-all"
        }`}
      />
      {cartItem.length > 0 && (
        <span className="fixed bottom-12 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {cartItem.reduce((totalQty, item) => totalQty + item.qty, 0)}
        </span>
      )}
    </>
  );
};

export default Cart;
