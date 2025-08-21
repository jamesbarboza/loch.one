import express from 'express';
import TradeService from './services/TradeService';
import PortfolioService from './services/PortfolioService';
import PriceSimulator from './services/PriceSimulator';
import TradeController from './controllers/TradeController';
import PortfolioController from './controllers/PortfolioController';

const app = express();
app.use(express.json());

const port = 3000;

const priceSimulator = new PriceSimulator();
priceSimulator.init();
console.log("Price simulator initialized with simulated prices:", priceSimulator.symbolsPrices);

const tradeService = new TradeService(priceSimulator);
const portfolioService = new PortfolioService(priceSimulator);

app.get('/trade/buy', (req, res) => { res.send('Trade Buy Endpoint'); });

// TODO: move this to a separate file
const tradeController = new TradeController(tradeService);
app.post('/trade/buy', tradeController.buy); 
app.post('/trade/sell', tradeController.sell);

// TODO: move this to a separate file
const portfolioController = new PortfolioController(portfolioService);
app.get('/portfolio', portfolioController.getPortfolio);
app.get('/portfolio/pnl-report', portfolioController.pnlReport);


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

