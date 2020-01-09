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

}

const propObj = {
    price: 400000,
    propTaxRate: 1.3,
    moHomeInsur: 100,
    moAssocFee: 100,
    moMaintenance: 500,
}

const Property = (obj=propObj) => {
    return Object.assign(Object.create(propertyProto), obj);
}


export default Property;
