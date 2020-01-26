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
    estimatedMoMI: function (loan, price) {
        const LTV = this.LTV(loan, price);
        let mirate;
        //These are just some rates based on 720 fico.
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
    LTV: function (loan, price) {
        return (this.loanAmount(loan, price) / price);
    },
    calculateMonthlyPayment: function (loan, price) {
        const amount = this.loanAmount(loan, price);
        const totalMonths = loan.term * this.paymentsPerYear;
        const monthlyRate = loan.rate / 100 / this.paymentsPerYear;
        return (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)) || 0;
    },
    amortizationSchedule: function (loan, price) {
        const amount = this.loanAmount(loan, price); 
        const totalMonths = loan.term * this.paymentsPerYear;
        const monthlyRate = (loan.rate / 100) / this.paymentsPerYear;
        const monthlyPayment = this.calculateMonthlyPayment(loan, price);
        const amorArray = [];
        let currentBalance = amount;
    
        for (var i = 0; i < totalMonths; i++) {
            const interest = currentBalance * monthlyRate;
            const calcMI = currentBalance / amount < .78 ? 0 : loan.moMI
            let principal = monthlyPayment - interest;
            principal = currentBalance < principal ? currentBalance : principal;
            currentBalance = currentBalance - principal;
            const obj = {
                payment: principal + interest + calcMI,
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
    rate: 3.84,
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