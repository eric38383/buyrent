import React from 'react';
import Bags from '../svg/Bags';

const Header = () => {
    return (
      <header>
        <div className="header-text">
          <h2>Is Buying a Home The Best Way to Build Wealth?</h2>
          <p>
            Homes come with many costs. Property taxes, repairs, mortgage insurance and homeowners insurance
            add a lot to your monthly payment. Many homeowners find themselves paying much more than
            they expected. 
          </p>
          <p>
            Selling your home is costly and because of the way loan amortization works,
            you won't be paying down most of your principal until the second half
            of your loan.
          </p>
          <p>
            This calculator will evaluate the true cost of purchasing a home and
            whether after 8 years (the average duration of homeownership), 
            renting would have been better after all.
          </p>
        </div>
        <div className="header-icon">
          <Bags height={"300px"} width={"400px"} />
        </div>
      </header>
    );
}

export default Header;