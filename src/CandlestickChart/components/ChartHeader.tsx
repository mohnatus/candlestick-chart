import { useContext } from "react";
import styled from "styled-components";

import { getDateComponents } from "../utils";
import { Candle } from "../types";
import { MONTHS, MONTHS_SHORT } from "../constants/months";
import { IsMobileContext } from "../context/index";

interface ChartHeaderProps {
    market: string;
    selected: Candle | null;
}

const Wrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ChartHeader = function ({ market, selected }: ChartHeaderProps) {
    const isMobile = useContext(IsMobileContext);

    let dateString = "";
    if (selected) {
        const { dayOfMonth, monthIndex, time } = getDateComponents(
            selected.openTime
        );
        const monthNames = isMobile ? MONTHS_SHORT : MONTHS;
        dateString = `${dayOfMonth} ${monthNames[monthIndex]} ${time}`;
    }

    return (
        <div>
            <div>{market} Price Chart</div>
            {dateString}
        </div>
    );
};

export type { ChartHeaderProps };
export { ChartHeader };
