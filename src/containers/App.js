import React from 'react';
import Nav from '../components/Nav';
import BuyRent from './BuyRent';
import '../../node_modules/react-vis/dist/style.css';

const App = () => {
  return (
    <div className="app">
      <Nav />
      <div className='container'>
        <BuyRent />
      </div>
    </div>
  );
}

export default App;
