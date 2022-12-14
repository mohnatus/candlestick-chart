import { formatDateMoment } from "./utils";

interface ChartHeaderProps {
  market: string;
  selected: Candle | null;
}
const ChartHeader = function ({
  market,
  selected,
}: ChartHeaderProps) {
  return (
    <div>
      <div>{market} Price Chart</div>
      {selected && <div>{formatDateMoment(selected.openTime)}</div>}
    </div>
  );
};

export type { ChartHeaderProps };
export { ChartHeader };
