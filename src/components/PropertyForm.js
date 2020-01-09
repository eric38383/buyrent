import React, { useContext, useEffect } from 'react';
import { Global } from '../contexts/global';
import useInputStateNumber from '../hooks/useInputStateNumber';
import Input from './Input';

const PriceInput = () => {
    const [state, dispatch] = useContext(Global);
    const { property, loan } = state;
    const [price, setPrice, priceTouched, priceError, setPriceError, handlePriceBlur] = useInputStateNumber('');
    
    useEffect(() => {
        const priceObj = { price: price };
        dispatch({ type: "SET_PROP_FIELD", payload: priceObj });
        if(price && !loan.closingCosts) {
            const closingObj = { closingCosts: loan.estimatedClosingCosts(price) };
            dispatch({ type: 'SET_LOAN_FIELD' , payload: closingObj })
        }
    }, [price])

    return (
        <>
            <label>Price</label>
            <input 
                type='number'
                className={`input${priceError ? ' form-input-error' : ''}`}
                onChange={(e) => setPrice(e.target.value)}
                onBlur={(e) => handlePriceBlur(e)}
                value={price}
            />
            {priceError ? <div className='form-error'>{priceError}</div> : null}
        </>
    )
}

export default PriceInput;

const PropertyForm = () => {
    const [state, dispatch] = useContext(Global);
    const { property } = state;
    const [propTaxRate, setPropTaxRate, propTaxRateTouched, propTaxRateError, setPropTaxError] = useInputStateNumber(property.propTaxRate);
    const [moHomeInsur, setMoHomeInsur, moHomeInsurTouched, moHomeInsurError, setMoHomeInsurError] = useInputStateNumber(property.moHomeInsur);
    const [moAssocFee, setMoAssocFee, moAssocFeeTouched, moAssocFeeError, setMoAssocFeeError] = useInputStateNumber(property.moAssocFee);
    const [moMaintenance, setMoMaintenanceFee, moMaintenanceTouched, moMaintenanceError, setMoMaintenanceError] = useInputStateNumber(property.moMaintenance);

    const handleBlur = (e, num, touched, setError) => {
        if(!num && !touched) {
            setError('Required')
        }
    }

    useEffect(() => {
        const propertyObj = {
            propTaxRate: propTaxRate,
            moAssocFee: moAssocFee,
            moHomeInsur: moHomeInsur,
            moMaintenance: moMaintenance
        };
        dispatch({ type: "SET_PROP_FIELD", payload: propertyObj });
    },  [propTaxRate, moHomeInsur, moAssocFee, moMaintenance]);


    return (
        <>
            <PriceInput />
            <label>Property Tax Rate</label>
            <input
                type='number'
                className={`input ${propTaxRateError ? 'form-input-error' : ''}`}
                onChange={(e) => setPropTaxRate(e.target.value)}
                onBlur={(e) => handleBlur(e, propTaxRate, propTaxRateTouched, setPropTaxError)}
                value={property.propTaxRate}
            />
            {propTaxRateError ? <div className='form-error'>{propTaxRateError}</div> : null}
            <label>Monthly Home Insurance</label>
            <input
                type='number'
                className={`input ${moHomeInsurError ? 'form-input-error' : ''}`}
                onChange={(e) => setMoHomeInsur(e.target.value)}
                onBlur={(e) => handleBlur(e, moHomeInsur, moHomeInsurTouched, setMoHomeInsurError)}
                value={property.moHomeInsur}
            />
            {moHomeInsurError ? <div className='form-error'>{moHomeInsurError}</div> : null}
            <label>Monthly Association Fee</label>
            <input
                type='number'
                className={`input ${moAssocFeeError ? 'form-input-error' : ''}`}
                onChange={(e) => setMoAssocFee(e.target.value)}
                onBlur={(e) => handleBlur(e, moAssocFee, moAssocFeeTouched, setMoAssocFeeError)}
                value={property.moAssocFee}
            />
            {moAssocFeeError ? <div className='form-error'>{moAssocFeeError}</div> : null}
            <label>Monthly Maintenance</label>
            <input
                type='number'
                className={`input ${moMaintenanceError ? 'form-input-error' : ''}`}
                onChange={(e) => setMoMaintenanceFee(e.target.value)}
                onBlur={(e) => handleBlur(e, moMaintenance, moMaintenanceTouched, setMoMaintenanceError)}
                value={property.moMaintenance}
            />
            {moMaintenanceError ? <div className='form-error'>{moMaintenanceError}</div> : null}
        </>
    )
}
