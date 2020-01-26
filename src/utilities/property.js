import { compoundInterest, range } from './helpers';

export const propFuncs = {
    avgAppreciationRate: 3.5,

    estimatedMoHomeInsur: function (prop) {
        return (prop.price * 0.0046) / 12
    },

    estimatedMoMaintenance: function (prop) {
        return (prop.price * .01) / 12;
    },
  
    forecastedPrice: function (prop, yr) {
        return compoundInterest(prop.price, this.avgAppreciationRate, yr);
    },

    forecastedPricePerYear: function (prop, yrs) {
        return range(0, yrs).map(yr => this.forecastPrice(prop, yr));
    },

    forecastedRunningTotal: function (prop, yr) {
        const perYear = this.forecastedPricePerYear(prop, yr);
        let sum = 0;
        return perYear.map(item => {
            sum += item;
            return sum;
        }); 
    },

    propTaxAtYear: function (prop, yr) {
        const price = this.forecastedPrice(prop, yr);
        return price * (prop.propTaxRate / 100);
    },

    forecastPropTaxPerYear: function (prop, yrs) {
        return range(0, yrs).map(yr => this.propTaxAtYear(prop, yr));
    },

    totalCosts: function (prop, amort, yrs) {
        const totals = [];
        for(let i = 0; i <= yrs; i++) {
            const propertyTax = compoundInterest(this.propTaxAtYear(prop, i), this.avgAppreciationRate, i);
            const insurance = compoundInterest(prop.moHomeInsur, this.avgAppreciationRate, i) * 12;
            const fees = compoundInterest(prop.moAssocFee, this.avgAppreciationRate, i) * 12;
            const repairs = compoundInterest(prop.moMaintenance, this.avgAppreciationRate, i) * 12;
            const total = (amort[i * 12].payment * 12)  + propertyTax + insurance + fees + repairs;
            totals.push(total);
        }
        return totals;
    }

}

const propObj = {
    price: '',
    propTaxRate: '',
    moHomeInsur: '',
    moAssocFee: '',
    moMaintenance: '',
    hasError: false
}

const Property = (obj=propObj) => {
    return Object.assign({}, obj);
}

export default Property;
