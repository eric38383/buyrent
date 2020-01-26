import React, { useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';
import { loanFuncs } from '../../utilities/loan';
import { propFuncs } from '../../utilities/property';
import InputNumber from '../InputNumber';
import Funnel from '../../svg/Funnel';


const PropertyForm = () => {
    const [state, dispatch] = useContext(Global);
    const { price, propTaxRate, moHomeInsur, moAssocFee, moMaintenance } = state.formState.property;
    const [inputPrice, setPrice, priceTouched, setPriceTouched, priceError, setPriceError, handlePriceBlur] = price;
    const [inputPropTaxRate, setPropTaxRate, propTaxRateTouched, setPropTaxRateTouched, propTaxRateError, setPropTaxError, handlePropTaxBlur] = propTaxRate;
    const [inputMoHomeInsur, setMoHomeInsur, moHomeInsurTouched, setMoHomeInsurTouched, moHomeInsurError, setMoHomeInsurError, handleMoHomeInsurBlur] = moHomeInsur;
    const [inputMoAssocFee, setMoAssocFee, moAssocFeeTouched, setMoAssocFeeTouched, moAssocFeeError, setMoAssocFeeError, handleMoAssocFeeBlur] = moAssocFee;
    const [inputMoMaintenance, setMoMaintenanceFee, moMaintenanceTouched, setMoMaintenanceTouched, moMaintenanceError, setMoMaintenanceError, handleMoMaintenanceBlur] = moMaintenance;

    useEffect(() => {
        const inputsTouched = priceTouched && propTaxRateTouched && moHomeInsurTouched && moAssocFeeTouched && moMaintenanceTouched;
        const propertyObj = {
            price: inputPrice,
            propTaxRate: inputPropTaxRate,
            moAssocFee: inputMoAssocFee,
            moHomeInsur: inputMoHomeInsur,
            moMaintenance: inputMoMaintenance,
            hasError: !inputsTouched || (priceError + propTaxRateError + moHomeInsurError + moAssocFeeError + moMaintenanceError) ? true : false
        };
        dispatch({ type: "SET_PROP_FIELD", payload: propertyObj });
    },  [inputPrice, inputPropTaxRate, inputMoHomeInsur, inputMoAssocFee, inputMoMaintenance]);

    const estimateCosts = (e) => {
      if(!inputPrice) {
        setPriceError('Price Is Required To Estimate Costs');
        return false;
      }
      const { loan, property } = state;
      const { closingCosts, moMI } = state.formState.loan;
      const setClosingCosts = closingCosts[1];
      const setMoMI = moMI[1];
      const touchedOnes = [setPropTaxRateTouched, setMoAssocFeeTouched, setMoHomeInsurTouched, setMoMaintenanceTouched, closingCosts[3], moMI[3]];
      touchedOnes.forEach(func => func(true));
      setPropTaxRate(1.35);
      setMoHomeInsur(Math.round(propFuncs.estimatedMoHomeInsur(property)));
      setMoAssocFee(0);
      setMoMaintenanceFee(Math.round(propFuncs.estimatedMoMaintenance(property)));
      setClosingCosts(Math.round(loanFuncs.estimatedClosingCosts(loan, property.price)));
      setMoMI(Math.round(loanFuncs.estimatedMoMI(loan, property.price)))
    }


    return (
      <>
          <InputNumber 
            label={<span onClick={(e) => estimateCosts(e)}>{"Price"}<Funnel size={15} title={'Estimate Costs'} style={{ 'marginLeft': '15px', 'cursor': 'pointer' }} /></span>}
            error={priceError}
            handleChange={setPrice}
            handleBlur={handlePriceBlur}
            value={inputPrice}
        />
          <InputNumber 
            label={"Property Tax Rate"}
            error={propTaxRateError}
            handleChange={setPropTaxRate}
            handleBlur={handlePropTaxBlur}
            value={inputPropTaxRate}
        />
          <InputNumber 
            label={"Monthly Home Insurance"}
            error={moHomeInsurError}
            handleChange={setMoHomeInsur}
            handleBlur={handleMoHomeInsurBlur}
            value={inputMoHomeInsur}
        />
          <InputNumber 
            label={"Monthly Association Fee"}
            error={moAssocFeeError}
            handleChange={setMoAssocFee}
            handleBlur={handleMoAssocFeeBlur}
            value={inputMoAssocFee}
        />
          <InputNumber 
            label={"Monthly Maintenance & Repairs"}
            error={moMaintenanceError}
            handleChange={setMoMaintenanceFee}
            handleBlur={handleMoMaintenanceBlur}
            value={inputMoMaintenance}
        />
      </>
    );
}

export default PropertyForm;