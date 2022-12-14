import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import styled from "styled-components";

import { useRequest } from "./hooks/useRequest";
import { CANDLESTICK_CHART_ENDPOINT } from "./constants/api";
import { DEFAULT_CHART_CONFIG } from "./constants/chart";
import { CandleModel } from "./entity/Candle";

import { Candles } from "./components/Candles";
import { CandleData } from "./components/CandleData";
import { ChartHeader } from "./components/ChartHeader";
import { ChartIntervals } from "./components/ChartIntervals";
import { Candle, CandleVars } from "./types";
import { IsMobileContext } from "./context";

interface CandlestickChartProps {
  market: string;
  intervals: Array<string>;
}

const Wrapper = styled.div`
  width: 510px;
`;

function CandlesHandler(data: CandleVars[]): Candle[] {
  return data.map((candleData) => CandleModel(candleData));
}

const CandlestickChartContent = function ({
  market,
  intervals,
}: Partial<CandlestickChartProps>) {
  const [marketName] = useState(market || DEFAULT_CHART_CONFIG.market);
  const [chartIntervals] = useState(
    intervals?.length ? intervals : DEFAULT_CHART_CONFIG.intervals
  );
  const [interval, setInterval] = useState(chartIntervals[0]);
  const [selectedCandleId, setSelectedCandleId] = useState<string | null>(null);
  const { pending, data, send, abort } = useRequest<Candle[]>(
    CANDLESTICK_CHART_ENDPOINT,
    CandlesHandler
  );

  const selectCandle = useCallback(
    (candle: Candle) => {
      setSelectedCandleId(candle.id);
    },
    [setSelectedCandleId]
  );

  const selectInterval = useCallback(
    (interval: string) => {
      setInterval(interval);
    },
    [setInterval]
  );

  let selectedCandle = null;
  if (data) {
    selectedCandle =
      data.find((candle) => candle.id === selectedCandleId) ||
      data[data.length - 1];
  }

  useEffect(() => {
    if (interval) {
      send({
        limit: 32,
        symbol: marketName,
        interval,
      });
    }

    return () => {
      abort();
    };
  }, [marketName, interval, send, abort]);

  if (!chartIntervals.length) {
    <div>Не указаны интервалы</div>;
  }

  return (
    <Wrapper>
      <ChartHeader market={marketName} selected={selectedCandle} />
      <Candles
        candles={data || []}
        selectedId={selectedCandleId}
        onSelect={selectCandle}
      />
      {selectedCandle && <CandleData candle={selectedCandle} />}
      <ChartIntervals
        intervals={chartIntervals}
        selected={interval}
        onSelect={selectInterval}
      />
    </Wrapper>
  );
};

const CandlestickChart = function (props: Partial<CandlestickChartProps>) {
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
      <CandlestickChartContent {...props} />
    </IsMobileContext.Provider>
  );
};

export type { CandlestickChartProps };
export { CandlestickChart };
