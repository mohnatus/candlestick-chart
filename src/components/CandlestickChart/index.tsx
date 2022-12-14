import { useEffect, useRef, useState, useCallback } from "react";
import { useRequest } from "../../hooks/useRequest";
import { CANDLESTICK_CHART_ENDPOINT } from "../../constants/api";
import { CandleModel } from "../../entity/Candle";
import { Candles } from "./Candles";
import { DEFAULT_CHART_CONFIG } from "../../constants/chart";
import { formatDateMoment } from './utils';

interface CandlestickChartProps {
  count: number;
  market: string;
  intervals: Array<string>;
}

interface CandlestickChartHeaderProps {
  market: string;
  selected: Candle | null;
}

function CandlesHandler(data: CandleVars[]): Candle[] {
  return data.map((candleData) => CandleModel(candleData));
}

const CandlestickChartHeader = function ({
  market,
  selected,
}: CandlestickChartHeaderProps) {
  return (
    <div>
      <div>{market} Price Chart</div>
      { selected && <div>{formatDateMoment(selected.openTime)}</div>}
      
    </div>
  );
};

const CandlestickChart = function ({
  count,
  market,
  intervals,
}: Partial<CandlestickChartProps>) {
  const [candlesCount] = useState(count || DEFAULT_CHART_CONFIG.count);
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

  let selectedCandle = null;
  if (data) {
    selectedCandle =
      data.find((candle) => candle.id === selectedCandleId) ||
      data[data.length - 1];
  }

  useEffect(() => {
    if (interval) {
      send({
        limit: candlesCount,
        symbol: marketName,
        interval,
      });
    }

    return () => {
      abort();
    };
  }, [candlesCount, marketName, interval, send, abort]);

  if (!chartIntervals.length) {
    <div>Не указаны интервалы</div>;
  }

  return (
    <div>
      <CandlestickChartHeader market={marketName} selected={selectedCandle} />
      <Candles
        candles={data || []}
        selectedId={selectedCandleId}
        onSelect={selectCandle}
      />
    </div>
  );
};

export type { CandlestickChartProps };
export { CandlestickChart };
