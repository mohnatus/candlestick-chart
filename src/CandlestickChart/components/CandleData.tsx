import { useContext } from "react";
import styled from "styled-components";

import { Candle } from "../types";
import { getCandleChange, getCandleAmplitude } from "../utils";
import { IsMobileContext } from "../context/index";
import { COLORS } from "../constants/colors";
import { SPACE_LG, SPACE_SM } from "../constants/view";

interface CandleDataProps {
  candle: Candle;
}

interface WrapperStyleProps {
  isMobile: boolean;
}

const WrapperStyle = styled.div<WrapperStyleProps>`
  display: flex;
  font-weight: 300;
  line-height: 1;
  font-size: ${props => props.isMobile ? 24 : 30}px;

  section:not(:last-child) {
    margin-right: ${props => props.isMobile ? SPACE_SM : SPACE_LG}px;
  }

  h2 {
    font-size: ${props => props.isMobile ? 15 : 18}px;
    margin: 0;
    color: ${COLORS.secondary};
  }
`;



const CandleData = function ({ candle }: CandleDataProps) {
  const isMobile = useContext(IsMobileContext);

  return (
    <WrapperStyle isMobile={isMobile}>
      <section>
        <h2>Open/Close</h2>
        <div>{candle.openPrice}</div>
        <div>{candle.closePrice}</div>
      </section>
      <section>
        <h2>High/Low</h2>
        <div>{candle.highestPrice}</div>
        <div>{candle.lowestPrice}</div>
      </section>
      <section>
        <h2>
          {isMobile ? "Change/Ampl" : "Change/Amplitude"}
        </h2>
        <div>{getCandleChange(candle)}%</div>
        <div>{getCandleAmplitude(candle)}%</div>
      </section>
    </WrapperStyle>
  );
};

export type { CandleDataProps };
export { CandleData };
