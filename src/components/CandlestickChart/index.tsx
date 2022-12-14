import { useEffect, useRef, useState, useCallback } from 'react';
import { useRequest } from "../../hooks/useRequest";
import { CANDLESTICK_CHART_ENDPOINT } from "../../api/index";
import { CandleModel } from "../../entity/Candle";
import { Candles } from "./Candles";

interface CandlestickChartProps {
  count: number;
  market: string;
  intervals: Array<string>;
}

const DEFAULT_CONFIG = {
  count: 32,
  market: "BTCUSDT",
  intervals: ["15m", "1H", "4H", "1D", "1W"],
};

function CandlesHandler(data: CandleVars[]): Candle[] {
  return data.map((candleData) => CandleModel(candleData));
}

const CandlestickChart = function ({
  count,
  market,
  intervals,
}: Partial<CandlestickChartProps>) {
  const [interval, setInterval] = useState(
    () => (intervals?.length && intervals[0]) || DEFAULT_CONFIG.intervals[0]
  );
  const [selectedCandleId, setSelectedCandleId] = useState<string | undefined>(
    undefined
  );
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

  useEffect(() => {
    send({
      limit: count || DEFAULT_CONFIG.count,
      symbol: market || DEFAULT_CONFIG.market,
      interval,
    });
    return () => {
      abort();
    };
  }, [count, market, interval, send, abort]);

  return (
    <div>
      <Candles
        candles={data || []}
        selected={selectedCandleId}
        onSelect={selectCandle}
      />
    </div>
  );
};

export type { CandlestickChartProps };
export { CandlestickChart };
