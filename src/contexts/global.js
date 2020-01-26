import React, { createContext, useReducer } from 'react';
import { RentReducer, PropertyReducer, LoanReducer, InvestmentReducer } from '../reducers';
import { Rent, Property, Loan, Investment } from '../utilities';
import useInputStateNumber from '../hooks/useInputStateNumber';


const initialState = {
    rent: Rent(),
    property: Property(),
    loan: Loan(),
    investment: Investment(),
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

    state.formState = {
        property: {
            price: useInputStateNumber(initialState.property.price),
            propTaxRate: useInputStateNumber(initialState.property.propTaxRate),
            moHomeInsur: useInputStateNumber(initialState.property.moHomeInsur, false),
            moAssocFee: useInputStateNumber(initialState.property.moAssocFee, false),
            moMaintenance: useInputStateNumber(initialState.property.moMaintenance, false)
        },
        loan: {
            term: useInputStateNumber(initialState.loan.term),
            rate: useInputStateNumber(initialState.loan.rate),
            closingCosts: useInputStateNumber(initialState.loan.moMI, false),
            moMI: useInputStateNumber(initialState.loan.moMI, false)
        }
    }
    return (
        <Global.Provider value={[state, dispatch]}>
            {children}
        </Global.Provider>
    )
} 

export const Global = createContext();
export default Store;