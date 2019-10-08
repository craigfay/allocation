const fs = require('fs');

// Read Datasets
const datasets = {
  tenYearBonds: JSON.parse(fs.readFileSync('_mid-term-bonds.json', 'utf8')),
  sp500: JSON.parse(fs.readFileSync('_SP500.json', 'utf8')),
}

// Zip Datasets together
// Find the longest dataset
const [longest] = Object.keys(datasets).sort(function(a,b) {
  if (datasets[a].length > datasets[b].length) return a;
  if (datasets[a].length < datasets[b].length) return b;
  return 0;
})

console.log(longest);
process.exit();

// Initialize Variables
let investable = 0;
let sharesOwned = 0;
let totalContributions = 0;
let mostRecentPrice = 0;
const monthlyContribution = 1000;


/**
 * Helper Functions
 */

// Get only the last n years of the dataset
function lastNYears(n) {
  return sp500.slice(data.length - (n * 12));
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
