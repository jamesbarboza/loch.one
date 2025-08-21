

class PortFolio {
  public holdings: { [symbol: string]: { quantity: number, purchasedAt: number, soldAt: number | null, pnl: number | null }[] };
  constructor() {
    this.holdings = {}; // eg: { 'BTC': [{ quantity: 1, purchasedAt: price1, soldAt: null }] }}
  }

  add (symbol: string, quantity: number, price: number): void {
    if (!this.holdings[symbol]) {
      this.holdings[symbol] = [];
    }
    this.holdings[symbol].push({ quantity, purchasedAt: price, soldAt: null, pnl: null });
  }

  subtract(symbol: string, quantity: number, price: number): void {
    if (!this.holdings[symbol] || this.holdings[symbol].length === 0) {
      throw new Error(`INSUFFICIENT_HOLDINGS`);
    }

    for (let i = 0; i < this.holdings[symbol].length; i++) {
      const holding = this.holdings[symbol][i];
      if (holding.quantity < quantity) {
        holding.soldAt = price;
        quantity -= holding.quantity;
      } else if (holding.quantity === quantity) {
        holding.soldAt = price;
        holding.pnl = (holding.soldAt - holding.purchasedAt) * holding.quantity;
        break;
      } else {
        const remainingQuantity = holding.quantity - quantity;
        holding.quantity = quantity;
        holding.soldAt = price;
        holding.pnl = (holding.soldAt - holding.purchasedAt) * quantity;
        this.holdings[symbol][i] = holding; // Update the holding with the
        // insert remaining quantity back into the portfolio
        this.holdings[symbol].push({ quantity: remainingQuantity, purchasedAt: holding.purchasedAt, soldAt: null, pnl: null });
        break;
      }
    }
  }

  totalHoldings(symbol: string): number {
    if (!this.holdings[symbol]) {
      return 0;
    }
    // return this.holdings[symbol].reduce((total, holding) => total + holding.quantity, 0);
    return this.holdings[symbol].reduce((total, holding) => {
      if (holding.soldAt === null) {
        return total + holding.quantity;
      }
      return total;
    }, 0);
  }

}

export default PortFolio;