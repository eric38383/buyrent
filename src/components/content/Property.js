import React from 'react';
import PropertyForm from '../forms/PropertyForm';

const PropertyContent = () => {
    return (
      <div className="row form-section">
        <div className="form-inner">
          <h2>Property</h2>
          <PropertyForm />
        </div>
        <div className="form-inner">
          <div className="form-inner-title">Future Home Value</div>
          <div className="form-inner-content">
            Over a long period of time, home prices have kept up well with
            inflation. However, as your home increases in value, so do your
            costs of ownership.
          </div>
          <div className="form-inner-title">Property Tax Rate</div>
          <div className="form-inner-content">
            Your rate is usually subject to the city, township, county or state
            that you're living. While your rate may never change, if you're
            proeprty increases in value, you may see increased taxes.
          </div>
          <div className="form-inner-title">Home Insurance</div>
          <div className="form-inner-content">
            About 97% of homeowners have insurance and even if you didn't want
            to buy it, its likely required by your lender.
          </div>
          <div className="form-inner-title">Maintenance & Repairs</div>
          <div className="form-inner-content">
            Many homeowners underestimte these costs, since when renting they
            often ignore issues that they would fix, if they owned the property.
            Most experts say that you will spend about 1% of your property value
            a year.
          </div>
          <div className="form-inner-title">Total Costs</div>
          <div className="form-inner-content">
            This calculator will add up your total costs and also take in to
            account inflation when calculating future values.
          </div>
          <div className="form-inner-title">Average Homeownship Duration</div>
          <div className="form-inner-content">
            According to ATTOM Data Solutions, the average duration of
            homeownship is about 8.05 years.
          </div>
        </div>
      </div>
    );
}

export default PropertyContent;