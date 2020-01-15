const loanProto = {
    paymentsPerYear: 12,
    formatRate: function () {
        return this.rate / 100;
    },
    estimatedClosingCosts: function (price) {
        const amount = this.loanAmount(price)
        return amount * 0.06;
    },
    loanAmount: function (price) {
        return price - this.downPayment;
    },
    LTV: function (price) {
        return (this.downPayment / price) * 100;
    },
    calculateMonthlyPayment: function (price) {
        const amount = this.loanAmount(price);
        const totalMonths = this.term * this.paymentsPerYear;
        const monthlyRate = this.rate / 100 / this.paymentsPerYear;
        return (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)) || 0;
    },
    amortizationSchedule: function (price) {
        const amount = this.loanAmount(price); 
        const totalMonths = this.term * this.paymentsPerYear;
        const monthlyRate = (this.rate / 100) / this.paymentsPerYear;
        const monthlyPayment = this.calculateMonthlyPayment(price);
        const amorArray = [];
        let currentBalance = amount;
    
        for (var i = 0; i < totalMonths; i++) {
            const interest = currentBalance * monthlyRate;
            let principal = monthlyPayment - interest;
            principal = currentBalance < principal ? currentBalance : principal;
            currentBalance = currentBalance - principal;
            const obj = {
                payment: principal + interest,
                principal: principal,
                interest: interest,
                balance: currentBalance,
            };
            amorArray.push(obj);
            if(currentBalance === 0) {
                return amorArray;
            }
        }
        return amorArray;
    }
}

const loanObj = {
    rate:  '',
    term: 30,
    downPayment: '',
    closingCosts: '',
    moMI: ''
}

const Loan = (obj=loanObj) => {
    return Object.assign(Object.create(loanProto), obj);
}


export default Loan;