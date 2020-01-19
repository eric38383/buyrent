import { compoundInterest, range } from './helpers';

export const rentFuncs = {
    avgRentIncrease: 3.7,
    forcastedRent: function (rent, yrs) {
        return compoundInterest(rent.monthlyRent, this.avgRentIncrease, yrs);
    },
    forecastedRentPerYear: function (rent, yrs) {
        return range(0, yrs).map(yr => this.forcastedRent(rent, yr) * 12);
    },
    forecastedRunningTotal: function (rent, yrs) {
        const perYear = this.forecastedRentPerYear(rent, yrs);
        let sum = 0;
        return perYear.map(item => {
            sum += item;
            return sum;
        });            
    },
}

const rentObj = {
    monthlyRent: '',
    hasError: true
}

const Rent = (obj=rentObj) => {
    return Object.assign({}, obj);
}

export default Rent;
