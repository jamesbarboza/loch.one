const utils = require('../utils/utils');
const User = require('../models/User').default;

class TradeService {
  public prices: PriceSimulator;

  constructor (prices : PriceSimulator) {
    this.prices = prices;
  }

  buy (user: typeof User, symbol: string, quantity: number, price: number): void {
    /* 
      Get the current price of the symbol
      if buy price is less that the current price, raise an exception
      if buy price is >= the current price, update the portfolio with the new holding
    */
    const time = utils.normaliseDateKey(new Date());
    const currentPrice = this.prices.get(symbol, time);

    if (quantity <= 0) {
      throw new Error(`INVALID_QUANTITY`);
    }
    
    if (price <= 0) {
      throw new Error(`INVALID_PRICE`);
    }

    if (currentPrice === null) {
      throw new Error(`CURRENT_PRICE_NOT_FOUND`);
    }

    if (price < currentPrice) {
      throw new Error(`BUY_PRICE_LESS_THAN_CURRENT_PRICE`);
    }

    user.portfolio.add(symbol, quantity, price);
    console.log(`[${time}] User ${user.id} bought ${quantity} of ${symbol} at price ${price} with current price ${currentPrice}`);
  }

  sell (user: typeof User, symbol: string, quantity: number, price: number): void {
    /*
      check if the user has enough holdings of the symbol
      if not, raise an exception
      if yes, update the portfolio by removing the holding and calculating profit/loss
    */

    const time = utils.normaliseDateKey(new Date());
    const currentPrice = this.prices.get(symbol, time);

    if (quantity <= 0) {
      throw new Error(`INVALID_QUANTITY`);
    }

    if (price < currentPrice) {
      throw new Error(`INVALID_PRICE`);
    }

    if (user.portfolio.totalHoldings(symbol) < quantity) {
      throw new Error(`INSUFFICIENT_HOLDINGS`);
    }

    user.portfolio.subtract(symbol, quantity, price);
    console.log(`User ${user.id} sold ${quantity} of ${symbol} at price ${price}`);
  }

}

export default TradeService;
