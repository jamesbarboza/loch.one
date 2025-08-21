const PriceSimulator = require('./PriceSimulator').default;
const PortFolio = require('../models/Portfolio').default;
const utils = require('../utils/utils');

class PortfolioService {

  constructor(private prices: any = PriceSimulator) {
    this.prices = prices;
  }

  calculateRealisedProfitLoss(portfolio: typeof PortFolio): number {
    // Logic to calculate realised profit/loss

    let totalProfitLoss = 0;
    for (const symbol in portfolio.holdings) {
      const holdings = portfolio.holdings[symbol];
      for (const holding of holdings) {
        if (holding.soldAt !== null) {
          const profitLoss = holding.pnl;
          totalProfitLoss += profitLoss;
        }
      }
    }
    return totalProfitLoss;
  }

  calculateUnrealisedProfitLoss(portfolio: typeof PortFolio): number {
    // Logic to calculate unrealised profit/loss
    let unrealisedPnL = 0;

    for (const symbol in portfolio.holdings) {
      const holdings = portfolio.holdings[symbol];
      for (const holding of holdings) {
        if (holding.soldAt === null) {
          const currentPrice = this.prices.get(symbol, utils.normaliseDateKey(new Date()));
          if (currentPrice !== null) {
            unrealisedPnL += (currentPrice - holding.purchasedAt) * holding.quantity;
          }
        }
      }
    }

    return unrealisedPnL;
  }
}

export default PortfolioService;