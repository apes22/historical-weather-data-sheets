import React, { Component } from 'react';
import HistoricalWeather from './components/historical-weather';
import Header from './components/header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="page">
          <HistoricalWeather/>
        </div>
      </div>
    );
  }
}

export default App;
