import React, { useContext, useState } from 'react';
import { Global } from '../contexts/global';
import Header from '../components/Header';
import { InvestmentContent, RentContent, PropertyContent, LoanContent, CostToSellContent } from '../components/content';
import BvrResults from '../components/BvrResults';
import ColorButton from '../components/ColorButton';

const Themes =[
    ['rgb(164, 180, 148)', 'rgb(190, 197, 173)', 'Army Shades'],
    ['rgb(84, 141, 196)', 'rgb(182, 209, 222)', 'Blue & Light Blue'],
    ['rgb(76, 95, 117)', 'rgb(193, 241, 219)', 'Dark Blue & Agua Green'],
    ['rgb(65, 234, 212)', 'rgb(255, 32, 10)', 'Winter Sky & Turquoise'],
    ['rgb(153, 98, 30)', 'rgb(255, 100, 50)', 'Brown & Orange']
]

const BuyRent = () => {
  const [colors, setColors] = useState(Themes[2]);
  const [showCharts, setShowCharts] = useState(false);
  const [touched, setTouched] = useState(false);
  const [state, dispatch] = useContext(Global);
  const { rent, property, loan, investment, costToSell } = state;
  //Has error tells us if some of the inputs are invalid or empty and we can not proceed
  const hasError = rent.hasError || loan.hasError || property.hasError || costToSell.hasError;

  const handleClick = (colors) => {
    setColors(colors);
  };

  const handleShowCharts = () => {
    if(!touched && !showCharts && hasError) {
      setTouched(true)
      return false;
    }

    if(!showCharts && hasError) {
      return false;
    }
    
    if(!touched) {
      setTouched(true);
    }
    
    setShowCharts(true);
  };

  return (
    <div>
      <Header />
      <section>
        <RentContent />
        <PropertyContent />
        <CostToSellContent />
        <LoanContent />
        <InvestmentContent colors={colors} />
        <div className="row form-section">
          <div className="form-inner">
            <div>Themes</div>
            <div className="row">
              {Themes.map(item => {
                return (
                  <div key={item} className="col">
                    <ColorButton 
                      colors={item} 
                      handleClick={handleClick} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="form-inner">
            <div>
              <button
                type="button"
                title='Show Results'
                className="button-dark right"
                onClick={() => handleShowCharts()}
              >
                Show Results
              </button>
            </div>
            {hasError && touched ? (
              <div className="bold form-error" style={{ marginTop: "15px" }}>
                Please fill out required fields.
              </div>
            ) : null}
          </div>
        </div>
      </section>
      {showCharts ? (
        <BvrResults
          rent={rent}
          property={property}
          loan={loan}
          investment={investment}
          colors={colors}
          costToSell={costToSell.val}
        />
      ) : null}
    </div>
  );
};

export default BuyRent;