import React from 'react';
import RentForm from '../forms/RentForm';

const Rent = () => {
    return (
        <div className='row form-section'>
        <div className='form-inner'>
            <h2>Rent</h2>
            <RentForm />
        </div>
        <div className='form-inner'>
            <div className='form-inner-title'>Rental Insurance</div>
            <div className='form-inner-content'>Only about <strong>37%</strong> of Americans have rental insurance according to the Insurance Information Institute. If you have rental insurance, include it as part of your monthly rent cost.</div>
            <div className='form-inner-title'>Average Rent Increase</div>
            <div className='form-inner-content'>Since 1984, Rent experience an average increase of about <strong>3.3%</strong> a year. This is will included when making our calculations.</div>
        </div>
    </div>
    )
}

export default Rent;