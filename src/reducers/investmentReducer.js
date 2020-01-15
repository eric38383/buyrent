//import investment from 

const InvestmentReducer = (state, action) => {
    switch(action.type) {
        case 'SET_INVESTMENT_FIELD':
            return Object.assign({}, state, action.payload);
        default: 
            return state;
    }
}

export default InvestmentReducer;