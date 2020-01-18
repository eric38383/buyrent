import { compoundInterest, range } from './helpers';

const propertyProto = {
    avgAppreciationRate: 3.5,
    
  
    forecastedPrice: function (yr) {
        return compoundInterest(this.price, this.avgAppreciationRate, yr);
    },

    forecastedPricePerYear: function (yrs) {
        return range(0, yrs).map(yr => this.forecastPrice(yr));
    },

    forecastedRunningTotal: function (yr) {
        const perYear = this.forecastedPricePerYear(yr);
        let sum = 0;
        return perYear.map(item => {
            sum += item;
            return sum;
        }); 
    },

    propTaxAtYear: function (yr) {
        const price = this.forecastedPrice(yr);
        return price * (this.propTaxRate / 100);
    },

    forecastPropTaxPerYear: function (yrs) {
        return range(0, yrs).map(yr => this.propTaxAtYear(yr));
    },

    totalCosts: function (loanPayment, yrs) {
        const totals = [];
        for(let i = 0; i <= yrs; i++) {
            const propertyTax = compoundInterest(this.propTaxAtYear(0), this.avgAppreciationRate, i);
            const insurance = compoundInterest(this.moHomeInsur, this.avgAppreciationRate, i) * 12;
            const fees = compoundInterest(this.moAssocFee, this.avgAppreciationRate, i) * 12;
            const repairs = compoundInterest(this.moMaintenance, this.avgAppreciationRate, i) * 12;
            const total = (loanPayment * 12) + propertyTax + insurance + fees + repairs;
            totals.push(total);
        }
        return totals;
    }

}

const propObj = {
    price: 400000,
    propTaxRate: 1.3,
    moHomeInsur: 100,
    moAssocFee: 100,
    moMaintenance: 300,
}

const Property = (obj=propObj) => {
    return Object.assign(Object.create(propertyProto), obj);
}


export default Property;
