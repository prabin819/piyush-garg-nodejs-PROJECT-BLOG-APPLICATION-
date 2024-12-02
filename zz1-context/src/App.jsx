import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Item from "./components/Item";
import Cart from "./components/Cart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Item name="macbook" price="100000" />
      <Item name="pendrive" price="4000" />
      <Item name="mobile" price="30000" />
      <Cart />
    </div>
  );
}

export default App;
