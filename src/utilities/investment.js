import { compoundInterest } from './helpers';

export const Investment = () =>{
    return {
        stocks: 60,
        bonds: 40,
        stockReturns: 8.46,
        bondReturns: 2.54
    }
}

export const calcReturns = (costDifferencePerYear, closingCosts, downPayment, blendedRate=5.5) => {
    let running = closingCosts + downPayment;
    return [running].concat(costDifferencePerYear.map(item => {
        const calc = compoundInterest(running, blendedRate, 1, 1, item); 
        running += calc - running;
        return running;
    }));
}