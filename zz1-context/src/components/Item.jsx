import React from "react";
import { useCart } from "../context/Cart";
const Item = (props) => {
  const cart = useCart();
  return (
    <div>
      {props.name} - {props.price}
      <button
        onClick={() =>
          cart.setItems([
            ...cart.items,
            { name: props.name, price: props.price },
          ])
        }
      >
        add to cart
      </button>
    </div>
  );
};

export default Item;
