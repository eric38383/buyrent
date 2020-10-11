export const loanFuncs = {
    paymentsPerYear: 12,
    downPayment: function(loan, price) {
        return price * (loan.downPaymentPer / 100)
    },
    formatRate: function (loan) {
        return loan.rate / 100;
    },
    estimatedClosingCosts: function (loan, price) {
        const amount = this.loanAmount(loan, price)
        return amount * 0.04;
    },
    /**
     * @param {obj} loan 
     * @param {number} price
     * @returns {number} - returns an estimated MI payment based on sample MI rates.
     */
    estimatedMoMI: function (loan, price) {
        const LTV = this.LTV(loan, price);
        let mirate;
        if(LTV <= .97) {
            mirate = .0087;
        } 
        if(LTV <= .95) {
            mirate = .0053;
        } 
        if (LTV <= .90) {
            mirate = .0038;
        }
        if (LTV <= .85 && LTV > .80) {
            mirate = .0023;
        }
        return (price * mirate) / 12;
    },
    loanAmount: function (loan, price) {
        return price * ((100 - loan.downPaymentPer) / 100)
    },
    // stands for Loan to Value
    LTV: function (loan, price) {
        return (this.loanAmount(loan, price) / price);
    },
    /**
     * 
     * @param {obj} loan 
     * @param {number} price 
     * @returns {number}
     */
    calculateMonthlyPayment: function (loan, price) {
        const amount = this.loanAmount(loan, price);
        const totalMonths = loan.term * this.paymentsPerYear;
        const monthlyRate = loan.rate / 100 / this.paymentsPerYear;
        return (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)) || 0;
    },
    /**
     * 
     * @param {obj} loan 
     * @param {number} price
     * @returns {array} - returns an array where each item is an object which has the total payment, 
     *            pricipal paid, interest paid, balance left and MI. 
     */
    amortizationSchedule: function (loan, price) {
        const amount = this.loanAmount(loan, price); 
        const totalMonths = loan.term * this.paymentsPerYear;
        const monthlyRate = (loan.rate / 100) / this.paymentsPerYear;
        const monthlyPayment = this.calculateMonthlyPayment(loan, price);
        const ltv = this.LTV(loan, price);
        const amorArray = [];
        let currentBalance = amount;
    
        for (var i = 0; i < totalMonths; i++) {
            const interest = currentBalance * monthlyRate;
            const calcMI = currentBalance / price < .78 || ltv <= .80 ? 0 : loan.moMI
            let principal = monthlyPayment - interest;
            principal = currentBalance < principal ? currentBalance : principal;
            currentBalance = currentBalance - principal;
            const obj = {
                payment: principal + interest + calcMI,
                principal: principal,
                interest: interest,
                balance: currentBalance,
                mi: calcMI
            };
            amorArray.push(obj);
            if(currentBalance === 0) {
                return amorArray;
            }
        }
        return amorArray;
    },
    /**
     * 
     * @param {obj} loan 
     * @param {number} price 
     * @returns object - The payment in which the MI falls off, the date and the total MI paid throughout the loan
     */
    getMIFalloff(loan, price) {
        if(
            !loan.term || 
            !loan.rate || 
            !loan.moMI || 
            !price || 
            this.LTV(loan, price) < 0.8
        ) {
            return {
                payment: 0,
                date: null,
                miPaid: 0
            }
        }

        let today = new Date();
        let totalMI = 0;
        const amort = this.amortizationSchedule(loan, price);
        for(let i = 0; i < amort.length; i++) {
            const ltv = amort[i].balance / price;
            totalMI += amort[i].mi;
            if(ltv < .78) {
                today.setMonth(today.getMonth() + i);
                return {
                    payment: i,
                    date: today,
                    miPaid: totalMI,
                }
            }
        }
    }
}

const loanObj = {
    rate: 3.25,
    term: 30,
    downPaymentPer: 10,
    closingCosts: '',
    moMI: '',
    hasError: false
}

const Loan = (obj=loanObj) => {
    return Object.assign({}, obj);
}


export default Loan;