import styled from "styled-components";
import { COLORS } from "../constants/colors";
import { SPACE_XS } from "../constants/view";

interface ChartIntervalsProps {
  intervals?: Array<string>;
  selected: string | null;
  onSelect: (interval: string) => void;
}

interface IntervalStyleProps {
  active: boolean;
}

const WrapperStyle = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  line-height: 1;
`;

const TitleStyle = styled.div`
  margin-right: ${SPACE_XS}px;
`;

const IntervalStyle = styled.button<IntervalStyleProps>`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 ${SPACE_XS}px;

  border: none;
  outline: none;

  background: transparent;
  color: ${(props) => (props.active ? COLORS.text : COLORS.secondary)};

  cursor: pointer;

  &:hover, &:focus {
    color: ${(props) => (props.active ? COLORS.text : COLORS.textHover)};
    outline: none;
    border: none;
  }
`;

const ChartIntervals = function ({
  intervals,
  selected,
  onSelect,
}: ChartIntervalsProps) {
  const list = [...new Set(intervals).values()];

  return (
    <WrapperStyle>
      <TitleStyle>Time</TitleStyle>
      {list.map((interval) => (
        <IntervalStyle
          type="button"
          key={interval}
          active={selected === interval}
          onClick={() => onSelect(interval)}>
          {interval}
        </IntervalStyle>
      ))}
    </WrapperStyle>
  );
};

export type { ChartIntervalsProps };
export { ChartIntervals };
