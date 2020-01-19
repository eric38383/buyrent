import React, { useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';
import useInputStateNumber from '../../hooks/useInputStateNumber';
import InputNumber from '../InputNumber';

const PropertyForm = () => {
    const [state, dispatch] = useContext(Global);
    const { property } = state;
    const [price, setPrice, priceTouched, priceError, setPriceError, handlePriceBlur] = useInputStateNumber(property.price);
    const [propTaxRate, setPropTaxRate, propTaxRateTouched, propTaxRateError, setPropTaxError, handlePropTaxBlur] = useInputStateNumber(property.propTaxRate);
    const [moHomeInsur, setMoHomeInsur, moHomeInsurTouched, moHomeInsurError, setMoHomeInsurError, handleMoHomeInsurBlur] = useInputStateNumber(property.moHomeInsur);
    const [moAssocFee, setMoAssocFee, moAssocFeeTouched, moAssocFeeError, setMoAssocFeeError, handleMoAssocFeeBlur] = useInputStateNumber(property.moAssocFee, false);
    const [moMaintenance, setMoMaintenanceFee, moMaintenanceTouched, moMaintenanceError, setMoMaintenanceError, handleMoMaintenanceBlur] = useInputStateNumber(property.moMaintenance, false);

    useEffect(() => {
        const inputsTouched = priceTouched && propTaxRateTouched && moHomeInsurTouched && moAssocFeeTouched && moMaintenanceTouched;
        const propertyObj = {
            price: price,
            propTaxRate: propTaxRate,
            moAssocFee: moAssocFee,
            moHomeInsur: moHomeInsur,
            moMaintenance: moMaintenance,
            hasError: !inputsTouched || (priceError + propTaxRateError + moHomeInsurError + moAssocFeeError + moMaintenanceError) ? true : false
        };
        dispatch({ type: "SET_PROP_FIELD", payload: propertyObj });
    },  [price, propTaxRate, moHomeInsur, moAssocFee, moMaintenance]);


    return (
      <>
          <InputNumber 
            label={"Price"}
            error={priceError}
            onChange={setPrice}
            onBlur={handlePriceBlur}
            value={price}
        />
          <InputNumber 
            label={"Property Tax Rate"}
            error={propTaxRateError}
            onChange={setPropTaxRate}
            onBlur={handlePropTaxBlur}
            value={propTaxRate}
        />
          <InputNumber 
            label={"Price"}
            error={priceError}
            onChange={setPrice}
            onBlur={handlePriceBlur}
            value={price}
        />
          <InputNumber 
            label={"Monthly Home Insurance"}
            error={moHomeInsurError}
            onChange={setMoHomeInsur}
            onBlur={handleMoHomeInsurBlur}
            value={moHomeInsur}
        />
          <InputNumber 
            label={"Monthly Association Fee"}
            error={moAssocFeeError}
            onChange={setMoAssocFee}
            onBlur={handleMoAssocFeeBlur}
            value={moAssocFee}
        />
          <InputNumber 
            label={"Monthly Maintenance & Repairs"}
            error={moMaintenanceError}
            onChange={setMoMaintenanceFee}
            onBlur={handleMoMaintenanceBlur}
            value={moMaintenance}
        />
      </>
    );
}

export default PropertyForm;