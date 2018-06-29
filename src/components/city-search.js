import React from 'react';

const CitySearch = ({cityInput, countryInput,  onChange, onSubmit}) =>{
  let input;
  return(
      <div>
    <span>City, State</span> 
  <form onSubmit={onSubmit}>
    <input 
      type="text" 
      value={cityInput}
      name="city"
      onChange={onChange}
      placeholder="e.g. San Francisco, CA"
      ref={(node) => input = node}
      required
    />
    <span>Country Code </span> 
    <input 
      type="text" 
      value={countryInput}
      name="country"
      onChange={onChange}
      placeholder="e.g. US"
      ref={(node) => input = node}
      required
    />
    
  <button type="submit">
    Submit
  </button>
  </form>
  </div>
  )
}

export default CitySearch;