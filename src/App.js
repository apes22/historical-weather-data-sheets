import React, { Component } from 'react';
import HistoricalWeather from './components/historical-weather';
import Header from './components/header';
import './App.css';

class App extends Component {
  render() {
    return (
      //create a header component
      <div className="App">
        <Header />
        <HistoricalWeather/>
      </div>
    );
  }
}

export default App;
