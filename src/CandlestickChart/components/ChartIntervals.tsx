import styled from "styled-components";
import { COLORS } from "../constants/colors";
import { SPACE_MD, SPACE_SM } from "../constants/view";

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
  background: transparent;
  padding: 0;
  border: none;
  outline: none;
  margin-left: ${SPACE_SM}px;
  color: ${(props) => (props.active ? COLORS.text : COLORS.secondary)};
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
