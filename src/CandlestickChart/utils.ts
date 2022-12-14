import { Candle, Moment, DateComponents } from "./types";

export function getMaxPrice(candles: Candle[]): number {
  return candles.reduce((max, candle) => Math.max(max, candle.highestPrice), 0);
}
export function getMinPrice(candles: Candle[]): number {
  return candles.reduce(
    (min, candle) => Math.min(min, candle.lowestPrice),
    Infinity
  );
}

export function getDateComponents(moment: Moment): DateComponents {
  const date = new Date(moment);

  const minutes = `${date.getMinutes()}`;
  const time = `${date.getHours()}:${minutes.padStart(2, "0")}`;

  return {
    dayOfMonth: date.getDate(),
    monthIndex: date.getMonth(),
    time,
  };
}

export function getCandleChange(candle: Candle): number {
  const result = (candle.closePrice / candle.openPrice) * 100 - 100;
  return Math.round(result * 100) / 100;
}

export function getCandleAmplitude(candle: Candle): number {
  const result = (candle.highestPrice / candle.lowestPrice) * 100 - 100;
  return Math.round(result * 100) / 100;
}
