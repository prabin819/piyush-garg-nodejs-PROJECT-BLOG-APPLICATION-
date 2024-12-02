import React from "react";
import { useCart } from "../context/Cart";

const Cart = (props) => {
  const cart = useCart();
  const total = cart.items.reduce((a, b) => a + parseInt(b.price), 0);

  return (
    <div>
      <h1>cart</h1>
      {cart &&
        cart.items.map((item) => (
          <li>
            {item.name}-${item.price}
          </li>
        ))}
      <br />
      total bill: ${total}
    </div>
  );
};

export default Cart;
