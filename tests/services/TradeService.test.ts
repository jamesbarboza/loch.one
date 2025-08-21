
describe('TradeService', () => {
  const TradeService = require('../../src/services/TradeService').default;
  const User = require('../../src/models/User').default;
  const PortFolio = require('../../src/models/Portfolio').default;
  const PriceSimulator = require('../../src/services/PriceSimulator').default;

  beforeAll(() => {
    jest.clearAllMocks();
    global.priceSimulator = new PriceSimulator();
    global.priceSimulator.init();

    global.tradeService = new TradeService(global.priceSimulator);

    jest.useFakeTimers();
    jest.advanceTimersByTime(10000);
  });

  it('should allow a user to buy a symbol if the price is correct', async () => {

    const user = new User('user1', new PortFolio());

    const symbol = 'BTC';
    const quantity = 1;
    const price = 94; // Assume this is the current price from the simulator

    global.tradeService.buy(user, symbol, quantity, price);

    // expect user's portfolio to have the new holding
    expect(user.portfolio.holdings[symbol]).toBeDefined();
    expect(user.portfolio.holdings[symbol][0].quantity).toBe(quantity);
    expect(user.portfolio.holdings[symbol][0].purchasedAt).toBe(price);
    expect(user.portfolio.holdings[symbol][0].soldAt).toBe(null);
  });

  it('should throw an error if the buy price is less than the current price', () => {
    const user = new User('user2', new PortFolio());

    const symbol = 'BTC';
    const quantity = 1;
    const price = 80; // Assume this is less than the current price from the simulator

    expect(() => {
      global.tradeService.buy(user, symbol, quantity, price);
    }).toThrow('BUY_PRICE_LESS_THAN_CURRENT_PRICE');
  });

  it('should throw an error if the buy price is invalid', () => {
    const user = new User('user3', new PortFolio());

    const symbol = 'BTC';
    const quantity = 1;
    const price = -10; // Invalid price

    expect(() => {
      global.tradeService.buy(user, symbol, quantity, price);
    }).toThrow('INVALID_PRICE');
  });


  it('should allow a user to sell a symbol if they have enough holdings', () => {
    const user = new User('user1', new PortFolio());

    const symbol = 'BTC';
    const buyQuantity = 2;
    const buyPrice = 94; // Assume this is the current price from the simulator

    global.tradeService.buy(user, symbol, buyQuantity, buyPrice);

    // expect user's portfolio to have the new holding
    expect(user.portfolio.holdings[symbol]).toBeDefined();
    expect(user.portfolio.holdings[symbol][0].quantity).toBe(buyQuantity);
    expect(user.portfolio.holdings[symbol][0].purchasedAt).toBe(buyPrice);
    expect(user.portfolio.holdings[symbol][0].soldAt).toBe(null);
    expect(user.portfolio.totalHoldings(symbol)).toBe(buyQuantity);

    const sellQuantity = 1;
    const sellPrice = 94; // Assume this is the current price from the simulator

    global.tradeService.sell(user, symbol, sellQuantity, sellPrice);
    expect(user.portfolio.holdings[symbol]).toBeDefined();
    expect(user.portfolio.holdings[symbol][0].quantity).toBe(buyQuantity - sellQuantity);
    expect(user.portfolio.holdings[symbol][0].soldAt).toBe(sellPrice);
    expect(user.portfolio.totalHoldings(symbol)).toBe(buyQuantity - sellQuantity);

    // Check if the remaining holding is updated correctly
    expect(user.portfolio.holdings[symbol][1].quantity).toBe(buyQuantity - sellQuantity);
    expect(user.portfolio.holdings[symbol][1].soldAt).toBe(null);
  });


  it('should throw an error if the user does not have enough holdings to sell', () => {
    const user = new User('user4', new PortFolio());
    const symbol = 'BTC';
    const quantity = 1;
    const price = 94; // Assume this is the current price from the simulator    

    expect(() => {
      global.tradeService.sell(user, symbol, quantity, price);
    }).toThrow('INSUFFICIENT_HOLDINGS');
  });

  it('should throw an error if the sell price is less than the current price', () => {
    const user = new User('user1', new PortFolio());

    const symbol = 'BTC';
    const quantity = 1;
    const price = 80; // Assume this is less than the current price from the simulator

    expect(() => {
      global.tradeService.sell(user, symbol, quantity, price);
    }).toThrow('INVALID_PRICE');
  });
});
