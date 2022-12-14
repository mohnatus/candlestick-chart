export function getMaxPrice(candles: Candle[]): number {
  return candles.reduce((max, candle) => Math.max(max, candle.highestPrice), 0);
}
export function getMinPrice(candles: Candle[]): number {
  return candles.reduce(
    (min, candle) => Math.min(min, candle.lowestPrice),
    Infinity
  );
}

export function getCandleOffset(candle: Candle, maxPrice: number): number {
  return maxPrice - candle.highestPrice;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateMoment(moment: Moment): string {
  const date = new Date(moment);

  const minutes = `${date.getMinutes()}`;

  return `${date.getDate()} ${
    MONTHS[date.getMonth()]
  } ${date.getHours()}:${minutes.padStart(2, "0")}`;
}
