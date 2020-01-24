export const loanFuncs = {
    paymentsPerYear: 12,
    downPayment: function(loan,price) {
        return price * (loan.downPaymentPer / 100)
    },
    formatRate: function (loan) {
        return loan.rate / 100;
    },
    estimatedClosingCosts: function (loan, price) {
        const amount = this.loanAmount(loan, price)
        return amount * 0.06;
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
        const ltv = this.LTV(loan, price)
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
        console.log(amorArray)
        return amorArray;
    },

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