declare namespace my {
    interface ICryptocompareResult {
      [string]: any
    }
    type CryptocompareResult = ICryptocompareResult | void
    interface IPriceResult {
      currency: string
      exchange: string
      symbol: string
      [string]: any
    }
    type PriceResult = IPriceResult | void
  }