import React from 'react';
import Bags from '../svg/Bags';

const Header = () => {
    return (
      <header>
        <div className="header-text">
          <h2>Is Buying a Home The Best Way to Build Wealth?</h2>
          <p>
            The answer? It depends. Homes come with many costs.
            Property taxes, repairs, mortgage insurance and homeowners insurance
            add a lot to your monthly payment.
          </p>
          <p>
            This calculator will evaluate the true cost of 
            purchasing a home and whether or not it's right for you.
          </p>
        </div>
        <div className="header-icon">
          <Bags height={"300px"} width={"400px"} />
        </div>
      </header>
    );
}

export default Header;