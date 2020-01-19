import { compoundInterest } from './helpers';

export const Investment = () =>{
    return {
        stocks: 60,
        bonds: 40,
        stockReturns: 8.46,
        bondReturns: 3.40,
        hasError: false,
        averageReturn: function () {
            return ((this.stocks / 100) * this.stockReturns) + ((this.bonds / 100) * this.bondReturns);
        }
    }
}

export const calcReturns = (costDifferencePerYear, closingCosts, downPayment, blendedRate) => {
    let running = closingCosts + downPayment;
    return [running].concat(costDifferencePerYear.map(item => {
        const diff = item > 0 ? item : 0;
        const calc = compoundInterest(running, blendedRate, 1, 1, diff); 
        running += calc - running;
        return running;
    }));
}