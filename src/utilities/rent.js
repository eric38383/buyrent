import { compoundInterest, range } from './helpers';

const rentProto = {
    avgRentIncrease: 3.7,
    forcastedRent: function (yrs) {
        return compoundInterest(this.monthlyRent, this.avgRentIncrease, yrs);
    },
    forecastedRentPerYear: function (yrs) {
        return range(0, yrs).map(yr => this.forcastedRent(yr));
    },
    forecastedRunningTotal: function (yrs) {
        const perYear = this.forecastedRentPerYear(yrs);
        let sum = 0;
        return perYear.map(item => {
            sum += item;
            return sum;
        });            
    },
}

const rentObj = {
    monthlyRent: 2000,
}

const Rent = (obj=rentObj) => {
    return Object.assign(Object.create(rentProto), obj);
}

export default Rent;
