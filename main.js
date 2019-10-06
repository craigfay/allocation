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
const totalYears = 10;

/**
 * Helper Functions
 */

// Get only the last n years of the dataset
function lastNYears(n) {
  return data.slice(data.length - (n * 12));
}

// Determine the total value of assets after the simulation
function equity() {
  return sharesOwned * mostRecentPrice + investable;
}

// Annualized Return on Investment
function annualizedROI(contributions, equity, holdingPeriod) {
  const ROI = equity / contributions;
  const exponent = 1 / holdingPeriod;
  return Math.pow(ROI, exponent) - 1;
}

// Simulate Investment Behavior
for (const month of lastNYears(totalYears)) {
  investable += monthlyContribution;
  investable += (month.Dividend / 12) * sharesOwned;

  const currentPrice = month.SP500;
  const amountPurchaseable = Math.floor(investable / currentPrice);

  sharesOwned += amountPurchaseable;
  investable -= currentPrice * amountPurchaseable;
  totalContributions += monthlyContribution;
  mostRecentPrice = currentPrice;
}

// Print Results
console.log({
  totalYears,
  investable: investable.toLocaleString(),
  sharesOwned: sharesOwned.toLocaleString(),
  totalContributions: totalContributions.toLocaleString(),
  mostRecentPrice: mostRecentPrice.toLocaleString(),
  equity: (sharesOwned * mostRecentPrice).toLocaleString(),
  annualizedROI: annualizedROI(totalContributions, equity(), totalYears),
});
