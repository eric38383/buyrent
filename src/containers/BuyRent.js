import React, { useContext, useState } from 'react';
import { Global } from '../contexts/global';
import Header from '../components/Header';
import { InvestmentContent, RentContent, PropertyContent, LoanContent } from '../components/content';
import BvrResults from '../components/BvrResults';
import ColorButton from '../components/ColorButton';


const Themes =[
    ['rgb(164, 180, 148)', 'rgb(190, 197, 173)'],
    ['rgb(234, 90, 87)', 'rgb(248, 220, 101)'],
    ['rgb(249, 223, 136)', 'rgb(81, 129, 182)'],
    ['rgb(124, 167, 170)', 'rgb(215, 87, 85)'],
    ['rgb(84, 141, 196)', 'rgb(182, 209, 222)'],
    ['rgb(76, 95, 117)', 'rgb(193, 241, 219)']
]

const BuyRent = () => {
    const [colors, setColors] = useState(Themes[0]);
    const [state, dispatch] = useContext(Global);
    const { rent, property, loan, investment } = state;

    const handleClick = (e, colors) => {
        setColors(colors);
    }
    
    return (
      <div>
        <Header />
        <section>
          <RentContent />
          <PropertyContent />
          <LoanContent />
          <InvestmentContent colors={colors} />
          <div className="row form-section">
            <div className="form-inner">
                <div>Themes</div>
                <div className='row'>
                    {Themes.map(item => {
                        return <div className='col'><ColorButton colors={item} handleClick={handleClick} /></div>
                    })}
                </div>
            </div>
            <div className="form-inner">
              <button type="button" className='button-dark right'>Calculate</button>
            </div>
          </div>
        </section>
        <BvrResults
          rent={rent}
          property={property}
          loan={loan}
          investment={investment}
          colors={colors}
        />
      </div>
    );
}

export default BuyRent;