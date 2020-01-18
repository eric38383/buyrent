import React, { useState, useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';

const InvestmentForm = () => {
    const [state, dispatch] = useContext(Global);
    const { investment } = state;
    const [stock, setStock] = useState(investment.stocks)

    useEffect(() => {
        const val = parseInt(stock);
        const investmentObj = {
            stocks: val,
            bonds: 100 - val
        }
        dispatch({ type: "SET_INVESTMENT_FIELD", payload: investmentObj });
    }, [stock])
    
    return (
        <>
            <label>Ratio of Stocks Compared To Bonds</label>
            <input value={stock} className='range' type='range' min='0' max="100" onChange={(e) => setStock(e.target.value)}></input>
        </>
    )
}

export default InvestmentForm;