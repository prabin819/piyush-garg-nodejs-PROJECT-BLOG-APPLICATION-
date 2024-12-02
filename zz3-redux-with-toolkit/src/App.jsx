import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import products from "./products.json";
import Product from "./components/Product";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <Cart />
      <div className="products">
        {products.map((product) => (
          <Product {...product} />
        ))}
      </div>
    </div>
  );
}

export default App;
