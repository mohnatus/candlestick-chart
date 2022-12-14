import styled from "styled-components";

interface CandleViewProps {
  candle: Candle;
  pointHeight: number;
}

interface CandleStyleProps {
  isBullish: boolean;
}

interface ExtremumStyleProps {
  height: number;
}

interface BodyStyleProps {
  height: number;
}

const CandleStyle = styled.div<CandleStyleProps>`
  color: ${(props) => (props.isBullish ? "green" : "red")};
`;

const ExtremumStyle = styled.div<ExtremumStyleProps>`
  height: ${(props) => props.height}px;
  background-color: currentColor;
`;

const BodyStyle = styled.div<BodyStyleProps>`
  height: ${(props) => props.height}px;
  background-color: currentColor;
  border: 1px solid black;
`;

function CandleView({ candle }: CandleViewProps) {
  const top = candle.isBullish ? candle.closePrice : candle.openPrice;
  const bottom = candle.isBullish ? candle.openPrice : candle.closePrice;

  const highHeight = candle.highestPrice - top;
  const bottomHeight = bottom - candle.lowestPrice;
  const bodyHeight = top - bottom;

  return (
    <CandleStyle isBullish={candle.isBullish}>
      <ExtremumStyle height={Math.abs(highHeight)}></ExtremumStyle>
      <BodyStyle height={Math.abs(bodyHeight)}></BodyStyle>
      <ExtremumStyle height={Math.abs(bottomHeight)}></ExtremumStyle>
     
    </CandleStyle>
  );
}

export type { CandleViewProps };
export { CandleView };
