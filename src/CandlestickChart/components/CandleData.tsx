import { useContext } from "react";
import styled from "styled-components";

import { Candle } from "../types";
import { getCandleChange, getCandleAmplitude } from "../utils";
import { IsMobileContext } from "../context/index";
import { COLORS } from "../constants/colors";
import { SPACE_LG, SPACE_SM } from "../constants/view";

interface CandleDataProps {
  candle: Candle | null;
}

interface WrapperStyleProps {
  isMobile: boolean;
}

const WrapperStyle = styled.div<WrapperStyleProps>`
  display: flex;
  
  font-size: ${(props) => (props.isMobile ? 24 : 30)}px;
  font-weight: 300;
  line-height: 1;
  
  section:not(:last-child) {
    margin-right: ${(props) => (props.isMobile ? SPACE_SM : SPACE_LG)}px;
  }

  div {
    text-aling: right;
  }

  h2 {
    margin: 0;

    font-size: ${(props) => (props.isMobile ? 15 : 18)}px;
    font-weight: 300;
    
    color: ${COLORS.secondary};
  }
`;

const DigitsStyle = styled.div`
  display: inline-block;
  text-align: right;
`

const CandleData = function ({ candle }: CandleDataProps) {
  const isMobile = useContext(IsMobileContext);

  let openPrice = '00000.00';
  let closePrice = '00000.00'
  let highestPrice = '00000.00'
  let lowestPrice = '00000.00'
  let change = '0.00'
  let amplitude = '0.00'

  if (candle) {
    openPrice = candle.openPrice.toFixed(2)
    closePrice = candle.closePrice.toFixed(2)
    highestPrice = candle.highestPrice.toFixed(2)
    lowestPrice = candle.lowestPrice.toFixed(2)
    change = getCandleChange(candle).toFixed(2)
    amplitude = getCandleAmplitude(candle).toFixed(2)
  }

  return (
    <WrapperStyle isMobile={isMobile}>
      <section>
        <h2>Open/Close</h2>
        <DigitsStyle>
          <div>{openPrice}</div>
          <div>{closePrice}</div>
        </DigitsStyle>
      </section>
      <section>
        <h2>High/Low</h2>
        <DigitsStyle>
          <div>{highestPrice}</div>
          <div>{lowestPrice}</div>
        </DigitsStyle>
      </section>
      <section>
        <h2>{isMobile ? "Change/Ampl" : "Change/Amplitude"}</h2>
        <DigitsStyle>
          <div>{change}%</div>
          <div>{amplitude}%</div>
        </DigitsStyle>
      </section>
    </WrapperStyle>
  );
};

export type { CandleDataProps };
export { CandleData };
