import { compoundInterest } from './helpers';

export const Investment = () => {
    return {
        stocks: 60,
        bonds: 40,
        stockReturns: 8.46,
        bondReturns: 3.40,
        averageReturn: function () {
            return ((this.stocks / 100) * this.stockReturns) + ((this.bonds / 100) * this.bondReturns);
        }
    }
}

/**
 * @function
 * @param {number} costDifferencePerYear - an array of the differences between a comparison of your rent and loan costs
 * @param {number} closingCosts - loan closing costs
 * @param {number} downPayment - loan down payment
 * @param {number} blendedRate - rate to compound your saving by not buying
 * @returns {array} - returns your total investment returns at the end of the year for every item.
 */
export const calcReturns = (costDifferencePerYear, closingCosts, downPayment, blendedRate) => {
    let running = closingCosts + downPayment;
    return [running].concat(costDifferencePerYear.map(item => {
        const diff = item > 0 ? item : 0;
        const calc = compoundInterest(running, blendedRate, 1, 1, diff); 
        running += calc - running;
        return running;
    }));
}