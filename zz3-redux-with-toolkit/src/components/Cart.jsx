import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector((state) => state);
  //console.log("items:", items);
  const total = items.cart.reduce((a, b) => a + b.price, 0);

  return (
    <div className="alert alert-success">
      <h3 className="text-center">
        Total items: {items.cart.length} (Rs. {total}/-)
      </h3>
    </div>
  );
};

export default Cart;
