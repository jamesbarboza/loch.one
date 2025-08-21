import express from 'express';
const app = express();
const port = 3000;
const PriceSimulator = require('./services/PriceSimulator');

const priceSimulator = new PriceSimulator();
priceSimulator.init();
console.log("Price simulator initialized with simulated prices:", priceSimulator.symbolsPrices);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});