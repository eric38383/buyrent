import React from 'react';
import Bags from '../svg/Bags';

const Header = () => {
    return (
        <header>
            <div className='header-text'>
                <h2>Should I Ever Buy A Home?</h2>
                <p>How many times have you heard that buying a home is the best way to build wealth.</p>
            </div>
            <div className='header-icon'>
                <Bags height={'300px'} width={'400px'} />
            </div>
        </header>
    )
}

export default Header;