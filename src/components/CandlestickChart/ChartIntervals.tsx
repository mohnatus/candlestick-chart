interface ChartIntervalsProps {
  intervals?: Array<string>;
  selected: string | null;
  onSelect: (interval: string) => void;
}

const ChartIntervals = function ({
  intervals,
  selected,
  onSelect,
}: ChartIntervalsProps) {
  const list = [...new Set(intervals).values()];

  console.log({ intervals, list })

  return (
    <div>
      Time
      {list.map((interval) => (
        <button type="button" key={interval} onClick={() => onSelect(interval)}>
          {interval}
        </button>
      ))}
    </div>
  );
};

export type { ChartIntervalsProps };
export { ChartIntervals };
