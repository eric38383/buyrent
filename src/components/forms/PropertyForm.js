import React, { useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';
import useInputStateNumber from '../../hooks/useInputStateNumber';
import { loanFuncs } from '../../utilities/loan';
import { propFuncs } from '../../utilities/property';
import InputNumber from '../InputNumber';
import Funnel from '../../svg/Funnel';

const PropertyForm = () => {
    const [state, dispatch] = useContext(Global);
    const { property, loan } = state;
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

    const estimateCosts = (e) => {
      if(!price) {
        setPriceError('Price Is Required To Estimate Costs');
        return false;
      }

      setPropTaxRate(1.35);
      setMoHomeInsur(Math.round(propFuncs.estimatedMoHomeInsur(property)));
      setMoAssocFee(0);
      setMoMaintenanceFee(Math.round(propFuncs.estimatedMoMaintenance(property)))
    
      const loanObj = {
        downPayPer: 10,
        term: 30,
        rate: 3.84,
        closingCosts: Math.round(
          loanFuncs.estimatedClosingCosts(loan, property.price)
        ),
        moMI: Math.round(loanFuncs.estimatedMoMI(loan, property.price))
      };
      dispatch({ type: "SET_LOAN_FIELD", payload: loanObj });
    }


    return (
      <>
          <InputNumber 
            label={<span onClick={(e) => estimateCosts(e)}>{"Price"}<Funnel size={15} title={'Estimate Costs'} style={{ 'marginLeft': '15px', 'cursor': 'pointer' }} /></span>}
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