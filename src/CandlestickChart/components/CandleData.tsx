import { useContext } from "react";

import { getCandleChange, getCandleAmplitude } from "../utils";
import { Candle } from "../types";
import { IsMobileContext } from "../context/index";

interface CandleDataProps {
  candle: Candle;
}

const CandleData = function ({ candle }: CandleDataProps) {
  const isMobile = useContext(IsMobileContext);

  return (
    <div>
      <div>
        <div>Open/Close</div>
        <div>{candle.openPrice}</div>
        <div>{candle.closePrice}</div>
      </div>
      <div>
        <div>High/Low</div>
        <div>{candle.highestPrice}</div>
        <div>{candle.lowestPrice}</div>
      </div>
      <div>
        <div>{isMobile ? "Change/Ampl" : "Change/Amplitude"}</div>
        <div>{getCandleChange(candle)}%</div>
        <div>{getCandleAmplitude(candle)}%</div>
      </div>
    </div>
  );
};

export type { CandleDataProps };
export { CandleData };
