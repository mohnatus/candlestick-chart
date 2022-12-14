import { useEffect, useRef, useState, useCallback } from "react";
import { useRequest } from "../../hooks/useRequest";
import { CANDLESTICK_CHART_ENDPOINT } from "../../constants/api";
import { CandleModel } from "../../entity/Candle";
import { Candles } from "./Candles";
import { DEFAULT_CHART_CONFIG } from "../../constants/chart";

interface CandlestickChartProps {
  count: number;
  market: string;
  intervals: Array<string>;
}

function CandlesHandler(data: CandleVars[]): Candle[] {
  return data.map((candleData) => CandleModel(candleData));
}

const CandlestickChart = function ({
  count,
  market,
  intervals,
}: Partial<CandlestickChartProps>) {
  const [interval, setInterval] = useState(
    (intervals?.length && intervals[0]) || DEFAULT_CHART_CONFIG.intervals[0]
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
    if (interval) {
      send({
        limit: count || DEFAULT_CHART_CONFIG.count,
        symbol: market || DEFAULT_CHART_CONFIG.market,
        interval,
      });
    }

    return () => {
      abort();
    };
  }, [count, market, interval, send, abort]);

  if (!interval) {
    <div>Не указаны интервалы</div>;
  }

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
