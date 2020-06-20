import React, { useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';
import InputNumber from '../InputNumber';

const CostToSell = () => {
    const [state, dispatch] = useContext(Global);
    const { costToSell } = state.formState;
    const [inputCostToSell, setCostToSell, costToSellTouched, setCostToSellTouched, costToSellError, setCostToSellError, handleCostToSellBlur] = costToSell;

    useEffect(() => {
        const costToSellObj = {
            val: inputCostToSell,
            hasError: costToSellError ? true : false
        }

        dispatch({ type: "SET_COST_TO_SELL_FIELD", payload: costToSellObj });
    },  [inputCostToSell]);
    
    return (
        <>
            <InputNumber 
                label='Cost To Sell'
                error={costToSellError}
                handleChange={setCostToSell}
                handleBlur={handleCostToSellBlur}
                value={inputCostToSell}
            />
        </>
    )
}

export default CostToSell;