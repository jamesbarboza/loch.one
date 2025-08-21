# loch.one

Node - v22.17.0


# Notes

- user should be able to TRADE provided symbols
- user should be able to GET the current portfolio
- user should be able to GET a PnL report (realised and unrealised profit/loss)
- [optional] user should be able to get current price of a Symbol

Can divide the app into 3 parts
Actuator -> action -> Feedback
User -> Trades -> Portfolio profit / loss

Further considerations?
- Does the system need to allow a user B to sell and list the symbol before allowing user A to buy?
- Does the sell price and buy price matching need to be accounted for?

PnL
- realised profit/loss
- unrealised profit/loss
  - what price should be taken to consideration for PnL?
 
simulation of price change
- sample data file for a symbol, each entry in a array represents per second change? - should be testable via a unit test
- PriceSimulator file contains an object with timestamps - price mapping for an interval of 10s
- test-generator generate 100 records for a range between 90 - 100. 


### Running the app

```
npx tsc && node dist/app.js
```

### Running unit test cases

```
npm test
```

### sample curl requests

execute a trade
```
curl --location 'http://127.0.0.1:3000/trade/buy' \
--header 'Content-Type: application/json' \
--data '{
    "userId": 1,
    "symbol": "BTC",
    "quantity": 2,
    "price": 95
}'
```

### Running the linter

```
npx eslint src/ --ext .ts
```