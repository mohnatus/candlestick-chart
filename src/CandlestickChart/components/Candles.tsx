import styled from "styled-components";
import { CHART_HEIGHT } from "../constants/view";
import { CandleView } from "./CandleView";
import { getMaxPrice, getMinPrice } from "../utils";
import { Candle } from "../types";

interface CandlesProps {
  candles: Candle[];
  selectedId: string | null;
  onSelect: (candle: Candle) => void;
}

const WrapperStyle = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
`;

const CandleWrapperStyle = styled.div`
  margin: 0 4px;
`;

const Candles = function ({ candles, selectedId, onSelect }: CandlesProps) {
  const maxPrice = getMaxPrice(candles);
  const minPrice = getMinPrice(candles);

  const diff = maxPrice - minPrice;
  const pointHeight = Math.floor((CHART_HEIGHT / diff) * 10000) / 10000;

  return (
    <div>
      <WrapperStyle>
        {candles.map((candle) => (
          <CandleWrapperStyle key={candle.id}>
            <CandleView
              candle={candle}
              maxPrice={maxPrice}
              pointHeight={pointHeight}
              selected={selectedId === candle.id}
              onClick={() => onSelect(candle)}
            ></CandleView>
          </CandleWrapperStyle>
        ))}
      </WrapperStyle>
    </div>
  );
};

export type { CandlesProps };
export { Candles };
