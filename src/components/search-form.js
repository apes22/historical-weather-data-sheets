import React from 'react';
import { Button, Row, Icon, Input } from 'react-materialize';
import  "./search-form.css";

const searchForm = ({cityInput, countryInput, onChange, onSubmit}) =>
<form className="grey-border-shadow" onSubmit={onSubmit}>
  <Row>
    <Input s={12} placeholder="e.g. San Francisco, CA" type="text" name="city" label="City,State" validate={true} onChange={onChange} value={cityInput}  icon="location_city" required />
    <Input s={12} placeholder="e.g. US" type="text" name="country" label="Country" validate={true} onChange={onChange} value={countryInput} icon="map" required/>
    <Button type='submit' waves='light'>Submit<Icon right>send</Icon></Button>
  </Row>
</form>

export default searchForm;