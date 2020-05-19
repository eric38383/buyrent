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
            Over a long period of time, home prices keep up well with
            inflation. However, as your home increases in value, so does the
            cost of ownership.
          </div>
          <div className="form-inner-title">Property Tax Rate</div>
          <div className="form-inner-content">
            Your rate is usually subject to the city, township, county or state
            that you're living in. The rate may never change, but if the
            property increases in value, the taxes will increase also.
          </div>
          <div className="form-inner-title">Home Insurance</div>
          <div className="form-inner-content">
            About 97% of purchasers have home ownership. It is required by lenders.
          </div>
          <div className="form-inner-title">Maintenance & Repairs</div>
          <div className="form-inner-content">
            Most experts estimate that you will spend about 1% per year 
            of your property value.  Potenial buyers tend to underestimate these costs, 
            since when renting, they often ignore issues that they would otherwise 
            fix if they owned the property.
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