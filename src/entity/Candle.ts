let unique = 1;

export function CandleModel(data: CandleVars): Candle {
  const openPrice = parseFloat(data[1]);
  const closePrice = parseFloat(data[4]);

  const isBullish = openPrice < closePrice;
  const isBearish = openPrice > closePrice;

  return {
    id: `${unique++}`,
    openTime: data[0],
    closeTime: data[6],
    openPrice,
    closePrice,
    highestPrice: parseFloat(data[2]),
    lowestPrice: parseFloat(data[3]),
    isBullish,
    isBearish,
  };
}
