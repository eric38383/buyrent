import React, { useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';
import useInputStateNumber from '../../hooks/useInputStateNumber';

const PropertyForm = () => {
    const [state, dispatch] = useContext(Global);
    const { property } = state;
    const [price, setPrice, priceTouched, priceError, setPriceError, handlePriceBlur] = useInputStateNumber(property.price);
    const [propTaxRate, setPropTaxRate, propTaxRateTouched, propTaxRateError, setPropTaxError, handlePropTaxBlur] = useInputStateNumber(property.propTaxRate);
    const [moHomeInsur, setMoHomeInsur, moHomeInsurTouched, moHomeInsurError, setMoHomeInsurError, handleMoHomeInsurBlur] = useInputStateNumber(property.moHomeInsur);
    const [moAssocFee, setMoAssocFee, moAssocFeeTouched, moAssocFeeError, setMoAssocFeeError, handleMoAssocFeeBlur] = useInputStateNumber(property.moAssocFee, false);
    const [moMaintenance, setMoMaintenanceFee, moMaintenanceTouched, moMaintenanceError, setMoMaintenanceError, handleMoMaintenanceBlur] = useInputStateNumber(property.moMaintenance, false);

    useEffect(() => {
        const propertyObj = {
            price: price,
            propTaxRate: propTaxRate,
            moAssocFee: moAssocFee,
            moHomeInsur: moHomeInsur,
            moMaintenance: moMaintenance
        };
        dispatch({ type: "SET_PROP_FIELD", payload: propertyObj });
    },  [price, propTaxRate, moHomeInsur, moAssocFee, moMaintenance]);


    return (
        <>
            <label>Price</label>
            <input 
                type='number'
                className={`input ${priceError ? 'form-input-error' : ''}`}
                onChange={(e) => setPrice(e.target.value)}
                onBlur={(e) => handlePriceBlur(e, price, priceTouched, setPriceError)}
                value={price}
            />
            {priceError ? <div className='form-error'>{priceError}</div> : null}
            <label>Property Tax Rate</label>
            <input
                type='number'
                className={`input ${propTaxRateError ? 'form-input-error' : ''}`}
                onChange={(e) => setPropTaxRate(e.target.value)}
                onBlur={(e) => handlePropTaxBlur(e, propTaxRate, propTaxRateTouched, setPropTaxError)}
                value={propTaxRate}
            />
            {propTaxRateError ? <div className='form-error'>{propTaxRateError}</div> : null}
            <label>Monthly Home Insurance</label>
            <input
                type='number'
                className={`input ${moHomeInsurError ? 'form-input-error' : ''}`}
                onChange={(e) => setMoHomeInsur(e.target.value)}
                onBlur={(e) => handleMoHomeInsurBlur(e, moHomeInsur, moHomeInsurTouched, setMoHomeInsurError)}
                value={moHomeInsur}
            />
            {moHomeInsurError ? <div className='form-error'>{moHomeInsurError}</div> : null}
            <label>Monthly Association Fee</label>
            <input
                type='number'
                className={`input ${moAssocFeeError ? 'form-input-error' : ''}`}
                onChange={(e) => setMoAssocFee(e.target.value)}
                onBlur={(e) => handleMoAssocFeeBlur(e, moAssocFee, moAssocFeeTouched, setMoAssocFeeError)}
                value={moAssocFee}
            />
            {moAssocFeeError ? <div className='form-error'>{moAssocFeeError}</div> : null}
            <label>Monthly Maintenance & Repairs</label>
            <input
                type='number'
                className={`input ${moMaintenanceError ? 'form-input-error' : ''}`}
                onChange={(e) => setMoMaintenanceFee(e.target.value)}
                onBlur={(e) => handleMoMaintenanceBlur(e, moMaintenance, moMaintenanceTouched, setMoMaintenanceError)}
                value={moMaintenance}
            />
            {moMaintenanceError ? <div className='form-error'>{moMaintenanceError}</div> : null}
        </>
    )
}

export default PropertyForm;