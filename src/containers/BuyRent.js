import React, { useContext } from 'react';
import { Global } from '../contexts/global';
import Header from '../components/Header';
import RentForm from '../components/RentForm';
import PropertyForm from '../components/PropertyForm';
import LoanForm from '../components/LoanForm';
import TotalCostsChart from '../components/charts/TotalCosts';

const BuyRent = () => {
    const [state, dispatch] = useContext(Global);
    const { rent } = state;
   
    return (
        <div>
            <Header />
            <section>
                <div className='form-section'>
                    <div className='form-inner'>
                        <h2>Rent</h2>
                        <RentForm />
                    </div>
                    <div className='form-inner'>
                        <div>Rental Insurance</div>
                        <div>Only about 37% of Americans have rental insurance according to the National Association of Fucktards. If you have rental insurance, include it as part of your monthly rent cost</div>
                        <div>Rental Insurance</div>
                        <div>Only about 37% of Americans have rental insurance according to the National Association of Fucktards. If you have rental insurance, include it as part of your monthly rent cost</div>
                    </div>
                </div>
                <div className='form-section'>
                    <div className='form-inner'>
                        <h2>Property</h2>
                        <PropertyForm />
                    </div>
                    <div className='form-inner'>
                        <div>Information about my property</div>
                    </div>
                </div>
                <div className='form-section'>
                    <div className='form-inner'>
                        <h2>Loan</h2>
                        <LoanForm />
                    </div>
                    <div className='form-inner'>
                        <div>Information about my mortgage</div>
                    </div>
                </div>
            </section>
            <section>
                <TotalCostsChart  data={rent.forecastedRunningTotal(10)} />
            </section>
        </div>
    )
}

export default BuyRent;