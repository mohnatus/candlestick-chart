export type Moment = number;

export type DateComponents = {
  dayOfMonth: number;
  monthIndex: number;
  time: string;
};

export type RequestParams = {
  [key: string]: string | number;
};

export type CandleVars = [
  openTime: number, // open time
  openPrice: string, // open price
  highPrice: string, // high price
  lowPrice: string, // low price
  closePrice: string, // close price
  volume: string, // volume
  closeTime: number, // close time
  quoteAssetVolume: string, // quote asset volume
  tradesNumber: number, // number of trades
  buyBaseAssetVolume: string, // taker buy base asset volume
  buyQuoteAssetVolume: string, // taker buy quote asset volume
  unused: string // unused
];

export type Candle = {
  id: string;
  openTime: Moment;
  closeTime: Moment;
  highestPrice: number;
  lowestPrice: number;
  openPrice: number;
  closePrice: number;
  isBullish: boolean;
  isBearish: boolean;
};
