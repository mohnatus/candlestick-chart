import styled from "styled-components";

interface ChartIntervalsProps {
  intervals?: Array<string>;
  selected: string | null;
  onSelect: (interval: string) => void;
}

interface IntervalStyleProps {
  active: boolean;
}

const IntervalStyle = styled.button<IntervalStyleProps>`
  cursor: pointer;
  ${(props) =>
    props.active &&
    `
    background: teal;
    color: white;
  `}
`;

const ChartIntervals = function ({
  intervals,
  selected,
  onSelect,
}: ChartIntervalsProps) {
  const list = [...new Set(intervals).values()];

  return (
    <div>
      Time
      {list.map((interval) => (
        <IntervalStyle
          type="button"
          key={interval}
          active={selected === interval}
          onClick={() => onSelect(interval)}>
          {interval}
        </IntervalStyle>
      ))}
    </div>
  );
};

export type { ChartIntervalsProps };
export { ChartIntervals };
