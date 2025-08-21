const fs = require('fs');
const constants = require('../utils/constants');
const utils = require('../utils/utils');

class PriceSimulator {
  symbolsPrices: {};
  constructor() {
    // A map to hold the simulated prices for each symbol
    // eg: { 'BTC': { timestamp1: price1, timestamp2: price2, ... } }
    this.symbolsPrices = {};
  }

  init() {
    try {
      const testData = JSON.parse(fs.readFileSync(constants.TEST_DATA_FILE_PATH, 'utf8'))
      console.log("Test data loaded successfully:", testData);

      let currentTime = Math.floor(Date.now() / 1000);
      for (const symbol in testData) {
        this.symbolsPrices[symbol] = {};
        for (const price in testData[symbol]) {
          currentTime = currentTime + 10; // Simulate a 10-second delay
          const date = new Date(currentTime * 1000);
          const normalisedDateKey = utils.normaliseDateKey(date);
          this.symbolsPrices[symbol][normalisedDateKey] = testData[symbol][price];
        }
      }
    } catch (error) {
      console.log("Error reading or parsing the test data file:", error);
    }
  }

  get(symbol: string, time : string) {
    return this.symbolsPrices[symbol]?.[time] || null;
  }
}


export default PriceSimulator;
