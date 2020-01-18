/**
 * @function
 * @param {int} amount - principal
 * @param {float} rate - compound interest rate
 * @param {int} years - total years compounding
 * @param {int} compoundPerYear - how many times per year you want to compound
 * @param {int} contribution - contributions per period
 * @description compound interest function
 * @returns {int} return amount compounded
 */
export const compoundInterest = (amount, rate, years, compoundPerYear = 1, contribution = 0) => {
    const formatRate = rate / 100;
    return amount * Math.pow(1 + (formatRate / compoundPerYear), years * compoundPerYear) + futureValueOfSeries(contribution, rate, years, compoundPerYear);
};

/**
 * @function
 * @param {int} investment - recurring, assumes investment always the same number
 * @param {float} rate - compound interest rate
 * @param {int} years - total years compound
 * @param {int} compoundPerYear - contributions per period
 * @description - calculate compounding interest by periodic contribution
 * @returns {int} returns investments compounded with periodic additions of the same amount
 */
export const futureValueOfSeries = (investment, rate, years, compoundPerYear = 1) => {
    const formatRate = rate / 100;
    let result = investment * (Math.pow(1 + formatRate / compoundPerYear, years * compoundPerYear) - 1) / (formatRate / compoundPerYear);
    return result;
};

/**
 * @function
 * @param {int} first - lower num
 * @param {float} last - higher num
 * @description - create an array from first number to last number
 * @returns {array}
 */
export const range = (first, last) => {
    let array = [];
    for(let i = first; i <= last; i++) {
        array.push(i);
    }
    return array;
} 

/**
 * @function
 * @param {int} val - separates number with commas 
 * @description - doesn't work with floats
 * @returns {array}
 */
export const commaSeparateNumber = (val) => {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}

/**
 * @function
 * @param {int} val
 * @returns {string} formatting money with commas 
 */
export const moneyFormat = (val) => {
    return '$' + commaSeparateNumber(Math.round(val));
}
