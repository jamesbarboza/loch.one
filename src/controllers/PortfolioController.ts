import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import User from '../models/User';

class PortfolioController {
  private portfolioService: any;

  constructor(portfolioService: any) {
    this.portfolioService = portfolioService;
  }

  public pnlReport: RequestHandler = (req: Request, res: Response, next) => {
    const { userId } = req.query;

    try {
      const user = User.users[userId as string];
      if (!userId) {
        return res.status(404).send({ error: 'USER_NOT_FOUND' });
      }

      const portfolio = user.portfolio;
      const realisedPnL = this.portfolioService.calculateRealisedProfitLoss(portfolio);
      const unrealisedPnL = this.portfolioService.calculateUnrealisedProfitLoss(portfolio);

      res.status(200).send({
        realisedPnL,
        unrealisedPnL
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  public getPortfolio: RequestHandler = (req: Request, res: Response, next) => {
    const { userId } = req.query;

    try {
      const user = User.users[userId as string];
      if (!user) {
        return res.status(404).send({ error: 'USER_NOT_FOUND' });
      }

      res.status(200).send(user.portfolio);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
}

export default PortfolioController;
