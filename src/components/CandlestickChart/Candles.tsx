import styled from "styled-components";
import { CHART_HEIGHT } from "../../constants/view";
import { CandleView } from "./CandleView";
import { getMaxPrice, getMinPrice, getCandleOffset } from './utils';

interface CandlesProps {
  candles: Candle[];
  selected?: string;
  onSelect: (candle: Candle) => void;
}

interface CandleWrapperStyleProps {
  offset: number;
}

const WrapperStyle = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
`;

const CandleWrapperStyle = styled.div<CandleWrapperStyleProps>`
  margin: 0 2px;
  flex-grow: 1;
  padding-top: ${(props) => props.offset}px;
`;

const Candles = function ({ candles, selected, onSelect }: CandlesProps) {
  const maxPrice = getMaxPrice(candles);
  const minPrice = getMinPrice(candles);

  const diff = maxPrice - minPrice;
  const pointHeight = Math.round((CHART_HEIGHT / diff) * 100) / 100;

  return (
    <div>
      <WrapperStyle>
        {candles.map((candle) => (
          <CandleWrapperStyle
            key={candle.id}
            offset={getCandleOffset(candle, maxPrice) * pointHeight}
          >
            <CandleView candle={candle} pointHeight={pointHeight}></CandleView>
          </CandleWrapperStyle>
        ))}
      </WrapperStyle>
    </div>
  );
};

export type { CandlesProps };
export { Candles };
