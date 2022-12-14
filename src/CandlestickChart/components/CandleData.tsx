import { useContext } from "react";
import styled from "styled-components";

import { Candle } from "../types";
import { getCandleChange, getCandleAmplitude } from "../utils";
import { IsMobileContext } from "../context/index";
import { COLORS } from "../constants/colors";
import { SPACE_LG } from "../constants/view";

interface CandleDataProps {
  candle: Candle;
}

const WrapperStyle = styled.div`
  display: flex;
  font-weight: 300;
  line-height: 1;
`;

const SectionStyle = styled.section`
  font-size: 30px;
  &:not(:last-child) {
    margin-right: ${SPACE_LG}px;
  }
`;

const HeaderStyle = styled.h2`
  font-size: 18px;
  margin: 0;
  color: ${COLORS.secondary};
`;

const CandleData = function ({ candle }: CandleDataProps) {
  const isMobile = useContext(IsMobileContext);

  return (
    <WrapperStyle>
      <SectionStyle>
        <HeaderStyle>Open/Close</HeaderStyle>
        <div>{candle.openPrice}</div>
        <div>{candle.closePrice}</div>
      </SectionStyle>
      <SectionStyle>
        <HeaderStyle>High/Low</HeaderStyle>
        <div>{candle.highestPrice}</div>
        <div>{candle.lowestPrice}</div>
      </SectionStyle>
      <SectionStyle>
        <HeaderStyle>
          {isMobile ? "Change/Ampl" : "Change/Amplitude"}
        </HeaderStyle>
        <div>{getCandleChange(candle)}%</div>
        <div>{getCandleAmplitude(candle)}%</div>
      </SectionStyle>
    </WrapperStyle>
  );
};

export type { CandleDataProps };
export { CandleData };
