const RentReducer = (state, action) => {
    switch(action.type) {
        case 'SET_RENT_FIELD':
            return Object.assign({}, state, action.payload);
        default: 
            return state;
    }
}

export default RentReducer