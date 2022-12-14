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