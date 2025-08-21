


function normaliseDateKey(date) {
  date = date.toISOString().split('.')[0];
  date = date.replace(/.$/, '0');
  return date
}

module.exports = {
  normaliseDateKey,
};
