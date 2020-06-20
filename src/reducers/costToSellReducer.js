const CostToSellReducer = (state, action) => {
    switch(action.type) {
        case 'SET_COST_TO_SELL_FIELD':
            return Object.assign({}, state, action.payload);
        default: 
            return state;
    }
}

export default CostToSellReducer;