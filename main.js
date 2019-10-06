// Read Dataset
const fs = require('fs');
const content = fs.readFileSync('_SP500.json', 'utf8');
const data = JSON.parse(content);

// Initialize Variables
let investable = 0;
let sharesOwned = 0;
let totalContributions = 0;
let mostRecentPrice = 0;
const monthlyContribution = 1000;
const totalYears = data.length / 12;

// Simulate Investment Behavior
for (const month of data) {
  investable += monthlyContribution;
  const currentPrice = month.SP500;
  const amountPurchaseable = Math.floor(investable / currentPrice);
  const transactionPrice = currentPrice * amountPurchaseable;
  sharesOwned += amountPurchaseable;
  investable -= transactionPrice;
  totalContributions += transactionPrice;
  mostRecentPrice = currentPrice;
}

function equity() {
  return sharesOwned * mostRecentPrice;
}

function annualizedROI(contributions, equity, years) {
  return (equity / contributions - 1) / years;
}

// Print Results
console.log({
  investable: investable.toLocaleString(),
  sharesOwned: sharesOwned.toLocaleString(),
  totalContributions: totalContributions.toLocaleString(),
  mostRecentPrice: mostRecentPrice.toLocaleString(),
  equity: (sharesOwned * mostRecentPrice).toLocaleString(),
  annualizedROI: annualizedROI(totalContributions, equity(), totalYears),
});
