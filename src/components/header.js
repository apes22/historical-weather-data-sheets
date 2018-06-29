import React from 'react';

const SunIcon = () =>  
<div className="App-logo">
  <i className="fa fa-sun-o fa-5x"></i>
</div>

const Header = () =>
<header className="App-header">
  <SunIcon />
  <h1 className="App-title">Welcome to the Historical Weather Sheet App</h1>
</header>

export default Header;