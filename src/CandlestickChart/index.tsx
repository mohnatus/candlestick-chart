import {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useContext,
} from "react";
import styled from "styled-components";

import { useRequest } from "./hooks/useRequest";
import { CANDLESTICK_CHART_ENDPOINT } from "./constants/api";
import { CandleModel } from "./entity/Candle";

import { Candles } from "./components/Candles";
import { CandleData } from "./components/CandleData";
import { ChartHeader } from "./components/ChartHeader";
import { ChartIntervals } from "./components/ChartIntervals";
import { Candle, CandleVars } from "./types";
import { IsMobileContext } from "./context";
import { SPACE_MD } from "./constants/view";
import { COLORS } from "./constants/colors";
import { CHART_INTERVALS, MARKET } from "./constants/chart";
import { MobileContextWrapper } from "./context/index";

interface WrapperStyleProps {
  isMobile: boolean;
}

const WrapperStyle = styled.div<WrapperStyleProps>`
  font-family: "Roboto", sans-serif;
  width: ${(props) => (props.isMobile ? 345 : 510)}px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;

  color: ${COLORS.text};

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    filter: blur(10px);
  }
`;

const ContentStyle = styled.div`
  padding: ${SPACE_MD}px;
  position: relative;
`;

const FooterStyle = styled.footer`
  height: 40px;
  display: flex;
  padding: 0 ${SPACE_MD}px;
  position: relative;
  background: #141414;
  color: white;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;

function CandlesHandler(data: CandleVars[]): Candle[] {
  return data.map((candleData) => CandleModel(candleData));
}

const CandlestickChartContent = function () {
  const isMobile = useContext(IsMobileContext);

  const [interval, setInterval] = useState(CHART_INTERVALS[0]);
  const [selectedCandleId, setSelectedCandleId] = useState<string | null>(null);
  const [candles, setCandles] = useState<Candle[]>([]);
  const { send, abort } = useRequest<CandleVars[]>(CANDLESTICK_CHART_ENDPOINT);

  const selectCandle = useCallback(
    (candle: Candle) => {
      setSelectedCandleId(candle.id);
    },
    [setSelectedCandleId],
  );

  const selectInterval = useCallback(
    (interval: string) => {
      setInterval(interval);
    },
    [setInterval],
  );

  useEffect(() => {
    if (interval) {
      send({
        limit: 32,
        symbol: MARKET,
        interval,
      }).then((list) => {
        setCandles(CandlesHandler(list));
      });
    }

    return () => {
      abort();
    };
  }, [interval, setCandles, send, abort]);

  const selectedCandle =
    candles.find((candle) => candle.id === selectedCandleId) ||
    candles[candles.length - 1];

  console.log({ isMobile });

  return (
    <WrapperStyle isMobile={isMobile}>
      <ContentStyle>
        <ChartHeader selected={selectedCandle} />
        <Candles
          candles={candles}
          selectedId={selectedCandleId}
          onSelect={selectCandle}
        />
        <CandleData candle={selectedCandle} />
      </ContentStyle>
      <FooterStyle>
        <ChartIntervals
          intervals={CHART_INTERVALS}
          selected={interval}
          onSelect={selectInterval}
        />
      </FooterStyle>
    </WrapperStyle>
  );
};

const CandlestickChart = function () {
  return (
    <MobileContextWrapper>
      <CandlestickChartContent />
    </MobileContextWrapper>
  );
};

export { CandlestickChart };
