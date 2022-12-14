import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { CandlestickChart } from "./components/CandlestickChart";

function App() {
  return (
    <div className="App">
      <div style={{ width: 500 }}>
        <CandlestickChart />
      </div>
    </div>
  );
}

export default App;
