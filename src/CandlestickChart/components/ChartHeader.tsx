import { useContext } from "react";
import styled from "styled-components";

import { getDateComponents } from "../utils";
import { Candle } from "../types";
import { MONTHS, MONTHS_SHORT } from "../constants/months";
import { IsMobileContext } from "../context/index";
import { COLORS } from "../constants/colors";
import { SPACE_SM } from "../constants/view";

interface ChartHeaderProps {
  selected: Candle | null;
}

interface WrapperStyleProps {
  isMobile: boolean;
}

const WrapperStyle = styled.header<WrapperStyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${(props) => (props.isMobile ? 17 : 19)}px;
  font-weight: 400;
  margin-bottom: ${SPACE_SM}px;
`;

const TitleStyle = styled.h1`
  color: ${COLORS.accent};
  margin: 0;
  font: inherit;
`;

const DateStyle = styled.div``;

const ChartHeader = function ({ selected }: ChartHeaderProps) {
  const isMobile = useContext(IsMobileContext);

  let dateString = "";
  if (selected) {
    const { dayOfMonth, monthIndex, time } = getDateComponents(
      selected.openTime,
    );
    const monthNames = isMobile ? MONTHS_SHORT : MONTHS;
    dateString = `${dayOfMonth} ${monthNames[monthIndex]} ${time}`;
  }

  return (
    <WrapperStyle isMobile={isMobile}>
      <TitleStyle>BTC/USDT Price Chart</TitleStyle>
      <DateStyle>{dateString}</DateStyle>
    </WrapperStyle>
  );
};

export type { ChartHeaderProps };
export { ChartHeader };
