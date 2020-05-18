import React, { useContext, useState } from 'react';
import { Global } from '../contexts/global';
import Header from '../components/Header';
import { InvestmentContent, RentContent, PropertyContent, LoanContent } from '../components/content';
import BvrResults from '../components/BvrResults';
import ColorButton from '../components/ColorButton';

const Themes =[
    ['rgb(164, 180, 148)', 'rgb(190, 197, 173)', 'Army Shades'],
    ['rgb(234, 90, 87)', 'rgb(248, 220, 101)', 'Red & Yellow'],
    ['rgb(249, 223, 136)', 'rgb(81, 129, 182)', 'Yellow & Blue'],
    ['rgb(124, 167, 170)', 'rgb(215, 87, 85)', 'Teal & Red'],
    ['rgb(84, 141, 196)', 'rgb(182, 209, 222)', 'Blue & Light Blue'],
    ['rgb(76, 95, 117)', 'rgb(193, 241, 219)', 'Dark Blue & Agua Green']
]

const BuyRent = () => {
  const [colors, setColors] = useState(Themes[2]);
  const [showCharts, setShowCharts] = useState(false);
  const [touched, setTouched] = useState(false);
  const [state, dispatch] = useContext(Global);
  const { rent, property, loan, investment } = state;
  const hasError = rent.hasError || loan.hasError || property.hasError;

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
      // fetch(`${process.env.REACT_APP_API_URL}/bvr-blueprints`, {
      //   method: 'post',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     rent: rent,
      //     property: property,
      //     loan: loan,
      //     investment: investment,
      //     theme: {
      //       primary: colors[0],
      //       secondary: colors[1],
      //     },
      //   }),
      // })
      //   .then((resp) => resp.json())
      //   .then((data) => {
      //     console.log(data);
      //   });
    }
    
    setShowCharts(true);
  };

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
        />
      ) : null}
    </div>
  );
};

export default BuyRent;