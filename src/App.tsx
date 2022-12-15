import { CandlestickChart } from "./CandlestickChart";
import styled, { createGlobalStyle } from "styled-components";

import bg from "./img/bg.jpg";
import bgLg from "./img/bg-lg.jpg";

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

const CopyrightStyle = styled.a`
  position: fixed;
  font-size: 19px;
  font-weight: 600;
  right: 20px;
  bottom: 15px;
  color: white;
`;

function App() {
  return (
    <div>
      <GlobalStyle />

      <CandlestickChart />

      <CopyrightStyle>
        Задизайнено в КейсТехе &gt;
      </CopyrightStyle>
    </div>
  );
}

export default App;
