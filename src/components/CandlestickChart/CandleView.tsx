import { MouseEvent } from "react";
import styled from "styled-components";

import { CANDLE_COLORS } from "../../constants/colors";
interface CandleViewProps {
  candle: Candle;
  pointHeight: number;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
}

interface CandleStyleProps {
  isBullish: boolean;
  isBearish: boolean;
}

interface ShadowStyleProps {
  height: number;
}

interface BodyStyleProps {
  height: number;
}

const CandleStyle = styled.div<CandleStyleProps>`
  color: black;
  ${(props) => props.isBullish && `color: ${CANDLE_COLORS.bullish};`}
  ${(props) => props.isBearish && `color: ${CANDLE_COLORS.bearish};`}
`;

const ShadowStyle = styled.div<ShadowStyleProps>`
  height: ${(props) => Math.floor(props.height * 10) / 10}px;
  background-color: currentColor;
  width: 2px;
  margin: 0 auto;
`;

const BodyStyle = styled.div<BodyStyleProps>`
  height: ${(props) => Math.floor(props.height * 10) / 10}px;
  background-color: currentColor;
`;

function CandleView({ candle, pointHeight, onClick }: CandleViewProps) {
  const top = candle.isBullish ? candle.closePrice : candle.openPrice;
  const bottom = candle.isBullish ? candle.openPrice : candle.closePrice;

  const topShadowHeight = candle.highestPrice - top;
  const bottomShadowHeight = bottom - candle.lowestPrice;
  const bodyHeight = top - bottom;

  return (
    <CandleStyle
      isBullish={candle.isBullish}
      isBearish={candle.isBearish}
      onClick={onClick}
    >
      <ShadowStyle height={topShadowHeight * pointHeight}></ShadowStyle>
      <BodyStyle height={bodyHeight * pointHeight}></BodyStyle>
      <ShadowStyle height={bottomShadowHeight * pointHeight}></ShadowStyle>
    </CandleStyle>
  );
}

export type { CandleViewProps };
export { CandleView };
