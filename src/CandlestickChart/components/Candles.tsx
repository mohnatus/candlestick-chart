import styled from "styled-components";
import { CHART_HEIGHT, SPACE_MD } from "../constants/view";
import { CandleView } from "./CandleView";
import { getMaxPrice, getMinPrice } from "../utils";
import { Candle } from "../types";
import { useContext } from "react";
import { IsMobileContext } from "../context/index";

interface CandlesProps {
  candles: Candle[];
  selectedId: string | null;
  onSelect: (candle: Candle) => void;
}

const WrapperStyle = styled.div`
  display: flex;
  width: 100%;
  min-height: ${CHART_HEIGHT}px;
  overflow: hidden;
  margin-bottom: ${SPACE_MD}px;
`;

const Candles = function ({ candles, selectedId, onSelect }: CandlesProps) {
  const isMobile = useContext(IsMobileContext);

  const candlesList = isMobile ? candles.slice(-21) : candles.slice(-32);

  const maxPrice = getMaxPrice(candlesList);
  const minPrice = getMinPrice(candlesList);

  const diff = maxPrice - minPrice;
  const pointHeight = Math.floor(CHART_HEIGHT / diff * 10000) / 10000;

  return (
    <div>
      <WrapperStyle>
        {candlesList.map((candle) => (
          <div key={candle.id}>
            <CandleView
              candle={candle}
              maxPrice={maxPrice}
              pointHeight={pointHeight}
              selected={selectedId === candle.id}
              onClick={() => onSelect(candle)}></CandleView>
          </div>
        ))}
      </WrapperStyle>
    </div>
  );
};

export type { CandlesProps };
export { Candles };
