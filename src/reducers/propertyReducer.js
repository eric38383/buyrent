const PropertyReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PROP_FIELD':
            console.log(state, action.payload)
            return Object.assign(state, action.payload);
        default: 
            return state;
    }
}

export default PropertyReducer;