import React, { useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';
import useInputStateNumber from '../../hooks/useInputStateNumber';
import InputNumber from '../InputNumber';

const PriceInput = () => {
  const [state, dispatch] = useContext(Global);
  const { property } = state;
  const [price, setPrice, priceTouched, priceError, setPriceError, handlePriceBlur] = useInputStateNumber(property.price);

  useEffect(() => {
    const inputsTouched = priceTouched;
    const propertyObj = {
        price: price,
        hasError: !inputsTouched || priceError ? true : false
    };
    dispatch({ type: "SET_PROP_FIELD", payload: propertyObj });
},  [price]);


  return (
    <>
      <InputNumber 
          label={"Price"}
          error={priceError}
          handleChange={setPrice}
          handleBlur={handlePriceBlur}
          value={price}
      />
    </> 
  )
}

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
            handleChange={setPrice}
            handleBlur={handlePriceBlur}
            value={price}
        />
          <InputNumber 
            label={"Property Tax Rate"}
            error={propTaxRateError}
            handleChange={setPropTaxRate}
            handleBlur={handlePropTaxBlur}
            value={propTaxRate}
        />
          <InputNumber 
            label={"Monthly Home Insurance"}
            error={moHomeInsurError}
            handleChange={setMoHomeInsur}
            handleBlur={handleMoHomeInsurBlur}
            value={moHomeInsur}
        />
          <InputNumber 
            label={"Monthly Association Fee"}
            error={moAssocFeeError}
            handleChange={setMoAssocFee}
            handleBlur={handleMoAssocFeeBlur}
            value={moAssocFee}
        />
          <InputNumber 
            label={"Monthly Maintenance & Repairs"}
            error={moMaintenanceError}
            handleChange={setMoMaintenanceFee}
            handleBlur={handleMoMaintenanceBlur}
            value={moMaintenance}
        />
      </>
    );
}

export default PropertyForm;