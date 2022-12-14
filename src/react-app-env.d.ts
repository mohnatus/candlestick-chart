/// <reference types="react-scripts" />

type Moment = number;

type RequestParams = {
  [key: string]: string | number;
};

type CandleVars = [
  openTime: number, // open time
  openPrice: string, // open price
  highPrice: string, // high price
  lowPrice: string, // low price
  closePrice: string, // close price
  volume: string, // volume
  closeTime: number, // close time
  quoteAssetVolume: string, // quote asset volume
  tradesNumber: number, // number of trades
  string, // taker buy base asset volume
  string, // taker buy quote asset volume
  string // unused
];


type Candle = {
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


