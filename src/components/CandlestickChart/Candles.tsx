import styled from "styled-components";
import { CandleView } from "./CandleView";

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

const HEIGHT = 100;

const Candles = function ({ candles, selected, onSelect }: CandlesProps) {
  const maxPrice = candles.reduce(
    (max, candle) => Math.max(max, candle.highestPrice),
    0
  );
  const minPrice = candles.reduce(
    (min, candle) => Math.min(min, candle.lowestPrice),
    Infinity
  );

 

  const diff = maxPrice - minPrice;
  const pointHeight = HEIGHT / diff;

  console.log({ maxPrice, minPrice, diff, pointHeight, candles  });

  return (
    <WrapperStyle>
      {candles.map((candle) => (
        <CandleWrapperStyle
          key={candle.id}
          offset={(maxPrice - candle.highestPrice) * pointHeight}
        >
          <CandleView candle={candle} pointHeight={pointHeight}></CandleView>
        </CandleWrapperStyle>
      ))}
    </WrapperStyle>
  );
};

export type { CandlesProps };
export { Candles };
