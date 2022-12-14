import { CandlestickChart } from "./CandlestickChart";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />

      <CandlestickChart />
    </div>
  );
}

export default App;
