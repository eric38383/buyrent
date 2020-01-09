const LoanReducer = (state, action) => {
    switch(action.type) {
        case 'SET_LOAN_FIELD':
            return Object.assign(state, action.payload);
        default: 
            return state;
    }
}

export default LoanReducer;