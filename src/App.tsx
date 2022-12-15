import { CandlestickChart } from "./CandlestickChart";
import styled, { createGlobalStyle } from "styled-components";

import bg from "./img/bg.jpg";
import bgLg from "./img/bg-lg.jpg";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 50px 15px;
    font-family: 'Roboto', sans-serif;
    background: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    @media screen and (min-width: 562px) {
      padding: 26px;
    }

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
  font-size: 16px;
  font-weight: 600;
  right: 20px;
  bottom: 60px;
  color: white;

  @media screen and (min-width: 562px) {
    font-size: 19px;
    right: 20px;
    bottom: 15px;
  }
`;

function App() {
  return (
    <div>
      <GlobalStyle />

      <CandlestickChart />

      <CopyrightStyle href="https://casetech.ru" target="_blank">
        Задизайнено в КейсТехе &gt;
      </CopyrightStyle>
    </div>
  );
}

export default App;
