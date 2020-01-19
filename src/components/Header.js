import React from 'react';
import Bags from '../svg/Bags';

const Header = () => {
    return (
      <header>
        <div className="header-text">
          <h2>Should I Ever Buy A Home?</h2>
          <p>
            How many times have you heard that buying a home is the best way to
            build wealth? A thousand times right? Lenders and realtors repeat
            this statement constantly. What they're not telling you is that
            there a lot of hidden costs when it comes to buying a home.
          </p>
          <p>
            Property taxes, repairs, mortgage insurance and homeowners insurance
            can really add a lot to your monthly payment. There are also other
            hidden costs. Most homeowners underestimate how much money will go
            to repairs. Your down payment and closings costs can no longer
            invested in higher returning assets such as stocks. And do you know
            loan amortization works? Well, most of your principal is not paid
            until final 10 years of your loan, which mean when you go to sell
            your home in 8 years, which is the average homeownership duration,
            you will not have built enough equity to increase your Net Worth.
          </p>
          <p>
            This tool will help you understand the true costs of buying a home,
            and many cases you'll find out that it was better to rent after all.
          </p>
        </div>
        <div className="header-icon">
          <Bags height={"300px"} width={"400px"} />
        </div>
      </header>
    );
}

export default Header;