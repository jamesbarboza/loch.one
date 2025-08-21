

const symbols = ['BTC'];
const data = {};

function getRandomInt(min, max) {
  min = Math.ceil(90); // Ensure min is an integer
  max = Math.floor(100); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


for (let i = 0; i < symbols.length; i++) {
  const symbol = symbols[i];
  data[symbol] = [];
  for (let j = 0; j < 100; j++) {
    const price = getRandomInt(90, 100);
    data[symbol].push(price);
  }
}

const fs = require('fs');
const jsonString = JSON.stringify(data, null, 2);
fs.writeFile('data.json', jsonString, (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return;
    }
    console.log("JSON data saved to output.json successfully!");
});