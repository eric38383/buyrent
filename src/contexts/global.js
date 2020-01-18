import React, { createContext, useReducer } from 'react';
import { RentReducer, PropertyReducer, LoanReducer, InvestmentReducer } from '../reducers';
import { Rent, Property, Loan, Investment } from '../utilities';

const initialState = {
    rent: Rent(),
    property: Property(),
    loan: Loan(),
    investment: Investment(),
    colors: ['rgb(37, 38, 49)', 'rgb(49, 86, 89)']
}

const combineReducers = reducers => {
    const keys = Object.keys(reducers);
    const state = keys.reduce((sum, key) => {
        return { ...sum, [key]: reducers[key][0]}
    }, {});
    
    const dispatch = action => {
        return keys
            .map(key => reducers[key][1])
            .forEach(fn => fn(action));
    }
    
    return [state, dispatch];
}

const Store = ({ children }) => {
    const [state, dispatch] = combineReducers({
        rent: useReducer(RentReducer, initialState.rent),
        property: useReducer(PropertyReducer, initialState.property),
        loan: useReducer(LoanReducer, initialState.loan),
        investment: useReducer(InvestmentReducer, initialState.investment),
    })

    return (
        <Global.Provider value={[state, dispatch]}>
            {children}
        </Global.Provider>
    )
} 

export const Global = createContext();
export default Store;