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
npm install
npx tsc && node dist/src/app.js
```

### Running unit test cases

```
npm test
```

### sample curl requests

execute a buy
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

execute a sell
```
curl --location 'http://127.0.0.1:3000/trade/sell' \
--header 'Content-Type: application/json' \
--data '{
    "userId": 1,
    "symbol": "BTC",
    "quantity": 2,
    "price": 102
}'
```

get current portfolio
```
curl --location 'http://127.0.0.1:3000/portfolio?userId=1'
```

get realised / unrealised PnL
```
curl --location 'http://127.0.0.1:3000/portfolio/pnl-report?userId=1'
```

### Running the linter

```
npx eslint src/ --ext .ts
```


### further changes

1. fix import statements - migrate to import from require.
2. move routers to different files
3. changes to API data presentation? - can add more detail in realised / unrealised profits