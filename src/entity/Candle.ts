let unique = 1;

export function CandleModel(data: CandleVars): Candle {
  const openPrice = parseFloat(data[1]);
  const closePrice = parseFloat(data[4]);

  return {
    id: `${unique++}`,
    openPrice,
    closePrice,
    highestPrice: parseFloat(data[2]),
    lowestPrice: parseFloat(data[3]),
    isBullish: openPrice < closePrice,
  };
}
