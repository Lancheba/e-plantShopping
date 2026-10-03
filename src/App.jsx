import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where green meets serenity</p>
            <button className="get-started-button" onClick={() => setShowProductList(true)}>
              Get Started
            </button>
            <AboutUs />
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
