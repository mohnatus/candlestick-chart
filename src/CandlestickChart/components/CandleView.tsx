import { MouseEvent } from "react";
import styled from "styled-components";

import { CANDLE_COLORS } from "../constants/colors";
import { Candle } from '../types';

interface CandleViewProps {
  candle: Candle;
  pointHeight: number;
  maxPrice: number;
  selected: boolean;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
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
  width: 7px;
  cursor: pointer;

  color: ${(props) =>
    props.active
      ? CANDLE_COLORS[props.type].active
      : CANDLE_COLORS[props.type].color};
  &:hover {
    color: ${(props) =>
      props.active
        ? CANDLE_COLORS[props.type].active
        : CANDLE_COLORS[props.type].hover};
  }

  padding-top: ${(props) => props.offset}px;
`;

const ShadowStyle = styled.div<ShadowStyleProps>`
  height: ${(props) => Math.floor(props.height * 10) / 10}px;
  background-color: currentColor;
  width: 1px;
  margin: 0 auto;
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
      onClick={onClick}
      offset={offset * pointHeight}
      active={selected}
    >
      <ShadowStyle height={topShadowHeight * pointHeight}></ShadowStyle>
      <BodyStyle height={bodyHeight * pointHeight}></BodyStyle>
      <ShadowStyle height={bottomShadowHeight * pointHeight}></ShadowStyle>
    </CandleStyle>
  );
}

export type { CandleViewProps };
export { CandleView };
