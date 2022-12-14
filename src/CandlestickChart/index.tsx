import { useEffect, useState, useCallback, useLayoutEffect, useContext } from 'react';
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
import { SPACE_MD, SPACE_SM } from "./constants/view";
import { COLORS } from "./constants/colors";
import { CHART_INTERVALS, MARKET } from './constants/chart';

interface WrapperStyleProps {
  isMobile: boolean
}

const WrapperStyle = styled.div<WrapperStyleProps>`
  width: ${ props => props.isMobile ? 345 : 510}px;
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
  padding: ${SPACE_SM}px ${SPACE_MD}px;
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
  const { pending, data, send, abort } = useRequest<CandleVars[]>(
    CANDLESTICK_CHART_ENDPOINT,
  );
  const [candles, setCandles] = useState<Candle[]>([]);

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

  const selectedCandle =
    candles.find((candle) => candle.id === selectedCandleId) ||
    candles[candles.length - 1];

  useEffect(() => {
    if (interval) {
      send({
        limit: 32,
        symbol: MARKET,
        interval,
      });
    }

    return () => {
      abort();
    };
  }, [interval, send, abort]);

  useEffect(() => {
    setCandles(CandlesHandler(data || []));
  }, [data, setCandles]);

  return (
    <WrapperStyle isMobile={isMobile}>
      <ContentStyle>
        <ChartHeader selected={selectedCandle} />
        <Candles
          candles={candles}
          selectedId={selectedCandleId}
          onSelect={selectCandle}
        />
        {selectedCandle && <CandleData candle={selectedCandle} />}
      </ContentStyle>
      <FooterStyle>
        <ChartIntervals
          intervals={CHART_INTERVALS}
          selected={interval}
          onSelect={selectInterval}
        />
      </FooterStyle>
      {pending && <div>Pending...</div>}
    </WrapperStyle>
  );
};

const CandlestickChart = function () {
  const [media, setMedia] = useState(false);

  useLayoutEffect(() => {
    const mq = "screen and (min-width: 526px)";
    const mql = window.matchMedia(mq);

    const cb = (mql: { matches: boolean }) => {
      setMedia(!mql.matches);
    };

    mql.addEventListener("change", cb);

    cb(mql);
  }, []);

  return (
    <IsMobileContext.Provider value={media}>
      <CandlestickChartContent />
    </IsMobileContext.Provider>
  );
};

export { CandlestickChart };
