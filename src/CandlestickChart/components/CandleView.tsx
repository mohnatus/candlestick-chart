import styled from "styled-components";

import { CANDLE_COLORS } from "../constants/colors";
import { Candle } from "../types";

interface CandleViewProps {
  candle: Candle;
  pointHeight: number;
  maxPrice: number;
  selected: boolean;
  onClick: () => void;
}

interface CandleStyleProps {
  type: "bullish" | "bearish" | "default";
  offset: number;
  active: boolean;
}

interface ShadowStyleProps {
  height: number;
}

interface BodyStyleProps {
  height: number;
}

const CandleStyle = styled.div<CandleStyleProps>`
  box-sizing: border-box;
  width: 15px;
  height: 100%;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: ${(props) => props.offset}px;

  color: ${(props) =>
    props.active
      ? CANDLE_COLORS[props.type].active
      : CANDLE_COLORS[props.type].color};

  cursor: pointer;

  &:hover {
    color: ${(props) =>
      props.active
        ? CANDLE_COLORS[props.type].active
        : CANDLE_COLORS[props.type].hover};
  }
`;

const ShadowStyle = styled.div<ShadowStyleProps>`
  width: 1px;
  height: ${(props) => Math.floor(props.height * 10) / 10}px;
  margin: 0 auto;

  background-color: currentColor;
`;

const BodyStyle = styled.div<BodyStyleProps>`
  height: ${(props) => Math.floor(props.height * 10) / 10}px;

  background-color: currentColor;
`;

function CandleView({
  candle,
  maxPrice,
  pointHeight,
  selected,
  onClick,
}: CandleViewProps) {
  const top = candle.isBullish ? candle.closePrice : candle.openPrice;
  const bottom = candle.isBullish ? candle.openPrice : candle.closePrice;

  const topShadowHeight = candle.highestPrice - top;
  const bottomShadowHeight = bottom - candle.lowestPrice;
  const bodyHeight = top - bottom;

  const offset = maxPrice - candle.highestPrice;

  return (
    <CandleStyle
      type={
        candle.isBullish ? "bullish" : candle.isBearish ? "bearish" : "default"
      }
      offset={offset * pointHeight}
      active={selected}
      onClick={onClick}>
      <ShadowStyle height={topShadowHeight * pointHeight}></ShadowStyle>
      <BodyStyle height={bodyHeight * pointHeight}></BodyStyle>
      <ShadowStyle height={bottomShadowHeight * pointHeight}></ShadowStyle>
    </CandleStyle>
  );
}

export type { CandleViewProps };
export { CandleView };
