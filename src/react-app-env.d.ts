/// <reference types="react-scripts" />

type RequestParams = {
  [key: string]: string | number;
};

type CandleVars = [
  number, // open time
  string, // open price
  string, // high price
  string, // low price
  string, // close price
  string, // volume
  number, // close time
  string, // quote asset volume
  number, // number of trades
  string, // taker buy base asset volume
  string, // taker buy quote asset volume
  string // unused
];


type Candle = {
  id: string;
  highestPrice: number;
  lowestPrice: number;
  openPrice: number;
  closePrice: number;
  isBullish: boolean;
  isBearish: boolean;
};
