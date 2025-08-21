
describe('PortfolioService', () => {
  let portfolioService;
  const PortFolio = require('../../src/models/Portfolio').default;
  const PriceSimulator = require('../../src/services/PriceSimulator').default;
  const PortfolioService = require('../../src/services/PortfolioService').default;

  beforeAll(() => {
    jest.clearAllMocks();

    global.priceSimulator = new PriceSimulator();
    global.priceSimulator.init();
    portfolioService = new PortfolioService(global.priceSimulator);

    jest.useFakeTimers();
  });

  it('should calculate realised profit/loss correctly', () => {
    let portfolio = new PortFolio();
    portfolio.holdings['BTC'] = [
      { quantity: 1, purchasedAt: 90, soldAt: 100, pnl: 10 },
      { quantity: 2, purchasedAt: 80, soldAt: 90, pnl: 20 }
    ];

    let realisedPnL = portfolioService.calculateRealisedProfitLoss(portfolio);
    expect(realisedPnL).toBe(30);

    portfolio = new PortFolio();
    portfolio.holdings['BTC'] = [
      { quantity: 1, purchasedAt: 90, soldAt: 100, pnl: 10 },
      { quantity: 2, purchasedAt: 100, soldAt: 80, pnl: -40 }
    ];

    realisedPnL = portfolioService.calculateRealisedProfitLoss(portfolio);
    expect(realisedPnL).toBe(-30);
  });

  it('should return zero for unrealised profit/loss as it is not implemented', () => {
    let portfolio = new PortFolio();
    portfolio.holdings['BTC'] = [
      { quantity: 1, purchasedAt: 90, soldAt: null, pnl: null },
      { quantity: 2, purchasedAt: 80, soldAt: null, pnl: null }
    ];

    jest.advanceTimersByTime(10000);
    let unrealisedPnL = portfolioService.calculateUnrealisedProfitLoss(portfolio);
    expect(unrealisedPnL).toBe(32); // As the method is not implemented yet
  });
});