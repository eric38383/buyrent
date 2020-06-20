import React from 'react';
import CostToSellForm from '../forms/CostToSellForm';


const CostToSell = () => {
    return (
        <div className='row form-section'>
            <div className="form-inner">
                <CostToSellForm />
            </div>
            <div className='form-inner'>
                <div className='form-inner-title'>
                    Breakdown of Costs as Percentage of Purchase Price
                </div>
                <div className='form-inner-content'>
                    <div>Real Estate Agent Commission: 6%</div>
                    <div>Seller Closing Costs: {"< 1%"} to 3%</div>
                    <div>Home Maintenace and Improvements: {"< 1%"}</div>
                    <div>Seller Concessions: {"< 1%"} to 2%</div>
                    <div>Moving: {"< 1%"}</div>
                </div>
            </div>
        </div>
    )
}

export default CostToSell;