import React from 'react';
import Bags from '../svg/Bags';

const Header = () => {
    return (
        <header>
            <div className='header-text'>
                <h2>Should I Ever Buy A Home?</h2>
                <p>How many times have you heard that buying a home is the best way to build wealth? It might seem that way, but there are a lot of hidden costs you have to take into account before signing your name on the bottom line. 
                </p>
                <p>
                Costs like property taxes, mortgage and homeowners insurance can really add a lot to your monthly payment. There are also the hidden costs. For example, homeowners end up spending a lot more money on maintenance then they ever expected. and now you've also lost your down payment and closings costs which can no longer invested in higher returning assets such as stocks. 
                </p>
                <p>
                This tool will help you understand the true costs of buying a home, and many cases you'll find out that maybe it was better to rent after all.
                </p>
            </div>
            <div className='header-icon'>
                <Bags height={'300px'} width={'400px'} />
            </div>
        </header>
    )
}

export default Header;