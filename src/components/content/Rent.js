import React from 'react';
import RentForm from '../forms/RentForm';

const Rent = () => {
    return (
      <div className="row form-section">
        <div className="form-inner">
          <h2>Rent</h2>
          <RentForm />
        </div>
        <div className="form-inner">
          <div className="form-inner-title">Rental Insurance</div>
          <div className="form-inner-content">
            Only about <strong>37%</strong> of Americans have rental insurance
            according to the Insurance Information Institute. This should be included
            as part of your monthly rent cost.
          </div>
          <div className="form-inner-title">Average Rent Increase</div>
          <div className="form-inner-content">
            Since 1984, Rent experienced an average increase of about <strong>3.3% </strong> 
            a year.
          </div>
        </div>
      </div>
    );
}

export default Rent;