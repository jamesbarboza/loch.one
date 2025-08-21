const TradeService = require('../services/TradeService');
import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import User from '../models/User';
import Portfolio from '../models/Portfolio';

class TradeController {
  private tradeService: typeof TradeService;

  constructor(tradeService: typeof TradeService) {
    this.tradeService = tradeService;
  }

  public buy: RequestHandler = (req: Request, res: Response, next) => {
    const { userId, symbol, quantity, price } = req.body;
    if (userId === undefined || symbol === undefined || quantity === undefined || price === undefined) {
      return res.status(400).send({ error: 'INVALID_REQUEST' });
    }

    try {
      let user = User.users[userId as string];
      if (!user) {
        // if user does not exist, create a new user
        user = new User(userId, new Portfolio());
      }
      this.tradeService.buy(user, symbol, quantity, price);
      res.status(200).send({ message: 'Trade executed successfully' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  public sell: RequestHandler = (req: Request, res: Response, next) => {
    const { userId, symbol, quantity, price } = req.body;

    try {
      let user = User.users[userId];
      if (!user) {
        throw new Error(`USER_NOT_FOUND`);
      }

      this.tradeService.sell(user, symbol, quantity, price);
      res.status(200).send({ message: 'Trade executed successfully' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
}

export default TradeController;