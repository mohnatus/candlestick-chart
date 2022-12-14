import { CandlestickChart } from "./CandlestickChart";
import { createGlobalStyle } from "styled-components";

import bg from './img/bg.jpg';
import bgLg from './img/bg-lg.jpg';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    @media only screen and (-Webkit-min-device-pixel-ratio: 1.5),
      only screen and (-moz-min-device-pixel-ratio: 1.5),
      only screen and (-o-min-device-pixel-ratio: 3/2),
      only screen and (min-device-pixel-ratio: 1.5) {
        .icon {
          background-image: url(${bgLg});
        }
      }
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
