import React, { useContext, useMemo } from 'react';
import { Global } from '../contexts/global';
import Header from '../components/Header';
import RentForm from '../components/RentForm';
import PropertyForm from '../components/PropertyForm';
import LoanForm from '../components/LoanForm';
import InvestmentForm from '../components/InvestmentForm';
import TotalCostsChart from '../components/charts/TotalCosts';
import Pie from '../components/charts/Pie';
import { objToArrayOfObjects } from '../utilities/helpers';

const BuyRent = () => {
    const [state, dispatch] = useContext(Global);
    const { rent, investment } = state;
    const formate = useMemo(() => [{ angle: investment.stocks }, { angle: investment.bonds }])
    console.log(state)
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
                        <div className='form-inner-title'>Rental Insurance</div>
                        <div className='form-inner-content'>Only about <strong>37%</strong> of Americans have rental insurance according to the Insurance Information Institute. If you have rental insurance, include it as part of your monthly rent cost.</div>
                        <div className='form-inner-title'>Average Rent Increase</div>
                        <div className='form-inner-content'>Since 1984, Rent experience an average increase of about <strong>3.3%</strong> a year. This is will included when making our calculations.</div>
                    </div>
                </div>
                <div className='form-section'>
                    <div className='form-inner'>
                        <h2>Property</h2>
                        <PropertyForm />
                    </div>
                    <div className='form-inner'>
                        <div className='form-inner-title'>Future Home Value</div>
                        <div className='form-inner-content'>Over a long period of time, home prices keep up well with inflation. However, as your home increases in value, so do your costs of ownership.</div>
                        <div className='form-inner-title'>Property Tax Rate</div>
                        <div className='form-inner-content'>Your rate is usually subject to the city, township, county or state that you're living. While your rate may never, if you're proeprty increases in value or is assessed a higher rate, you may see an increased taxes.</div>
                        <div className='form-inner-title'>Home Insurance</div>
                        <div className='form-inner-content'>About 97% of homeowners have insurance and even if you didn't want to buy it, its likely required by your lender.</div>
                        <div className='form-inner-title'>Maintenance & Repairs</div>
                        <div className='form-inner-content'>Estimate at 1%. Maybe show Angie's list link</div>
                    </div>
                </div>
                <div className='form-section'>
                    <div className='form-inner'>
                        <h2>Loan</h2>
                        <LoanForm />
                    </div>
                    <div className='form-inner'>
                        <div className='form-inner-title'>Down Payment</div>
                        <div className='form-inner-content'>How this is your largest costs</div>
                        <div className='form-inner-title'>Term</div>
                        <div className='form-inner-content'>Maybe something on shorter term</div>
                        <div className='form-inner-title'>Rate</div>
                        <div className='form-inner-content'>List average rates</div>
                        <div className='form-inner-title'>Closing Costs</div>
                        <div className='form-inner-content'>List all costs</div>
                        <div className='form-inner-title'>MI</div>
                        <div className='form-inner-content'>at 20%</div>
                    </div>
                </div>
                <div className='form-section'>
                    <div className='form-inner'>
                        <h2>Investment Profile</h2>
                        <InvestmentForm />
                    </div>
                    <div className='form-inner'>
                        <Pie data={formate} height={200} width={200} />
                    </div>
                </div>
            </section>
            <section>
                <TotalCostsChart data={rent.forecastedRunningTotal(10)} />
            </section>
        </div>
    )
}

export default BuyRent;