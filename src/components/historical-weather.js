import React, { Component } from 'react';
import SearchForm from './search-form';
import Link from './link';
import Loading from './loading';
import fetch from 'isomorphic-fetch';

const PATH_BASE = 'https://api.weatherbit.io/v2.0/history/daily';
const PARAM_CITY= 'city=';
const PARAM_COUNTRY= 'country=';
const PARAM_START_DATE = 'start_date=';
const PARAM_END_DATE = 'end_date=';
const PARAM_UNITS = 'units=';
const PARAM_KEY = 'key=';

const DISCOVERYDOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = "1plgIyhW093-gRVzZwIO8L_ToTGcAr7xQ9AzDOz2qO0E";

class HistoricalWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      city: "",
      country: "",
      formSubmitted: null,
      link: null,
      error: null,
    };

    this.fetchCityHistoricalWeather = this.fetchCityHistoricalWeather.bind(this);
    this.requestCityHistoricalData = this.requestCityHistoricalData.bind(this);
    this.transformData = this.transformData.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.initClient = this.initClient.bind(this);
    this.postToGoogleSheet = this.postToGoogleSheet.bind(this);
    this.checkGoogleSignInStatus = this.checkGoogleSignInStatus.bind(this);
    this.createNewSheet = this.createNewSheet.bind(this);
    this.handleErrors = this.handleErrors.bind(this);
  }

  fetchCityHistoricalWeather(cityTerm, countryTerm) {
    this.setState({ formSubmitted: true });
    let url = `${PATH_BASE}?${PARAM_CITY}${encodeURIComponent(cityTerm)}&${PARAM_COUNTRY}${countryTerm}&${PARAM_START_DATE}${"2018-06-27"}&${PARAM_END_DATE}${"2018-06-28"}&${PARAM_UNITS}${"I"}&${PARAM_KEY}${process.env.REACT_APP_WEATHERBIT_APIKEY}`
    return fetch(url)
      .then(response => {
        if (!response.ok) {     
        console.error(response);
         return "error";
        }else{
          if (response.status == 204) return "error"
          return response.json(); 
        }
      }).catch(this.handleErrors)
  }
  
  transformData(result){
    let data = [];
    data[0] =  ["Date", "Temp", "Max_Temp", "Min_Temp"];
    //transform data into arrays of arrays 
    result.data.forEach(point => {
        let row = [];
        row.push(point.datetime);
        row.push(point.temp);
        row.push(point.max_temp);
        row.push(point.min_temp);
        data.push(row);
    });
    return data; 
  }

  onSearchSubmit(event){
    this.handleClientLoad(); 
    event.preventDefault();
  }

  onInputChange(event){
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value});
  }

  handleClientLoad() {
    // Load the JavaScript client library
     window.gapi.load('client:auth2', this.initClient);
  }

  initClient () {
    // Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENTID,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        discoveryDocs: DISCOVERYDOCS
      }).then(() => {
        this.checkGoogleSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  checkGoogleSignInStatus(isSignedIn) {
    isSignedIn ? this.requestCityHistoricalData() : this.openGoogleSignIn()
  }

  openGoogleSignIn(){
    this.setState({ error: ''});
    window.gapi.auth2.getAuthInstance().signIn().then(function () {
      this.requestCityHistoricalData();
    }, this.handleErrors);
  }

  async requestCityHistoricalData() {
    this.setState({ isLoading: true });
    const {city, country} = this.state;
    let result = await this.fetchCityHistoricalWeather(city, country);  
    console.log(result);
    if (result === "error"){
      this.setState({
        error: "There was an error getting data from Weatherbit :(", 
        isLoading: false
      });
    }
    else{
      let historicalData = this.transformData(result);
      this.postToGoogleSheet(historicalData);
    }
  }

  postToGoogleSheet(data){
    window.gapi.client.load("sheets", "v4", () => {
      let newSheetRequest = this.createNewSheet();
      newSheetRequest.then(res => {
        let newSheetTitle = `${res.result.replies[0].addSheet.properties.title}`;
        let addDataToNewSheetRequest = this.addDataToSheet(newSheetTitle, data);
        addDataToNewSheetRequest.then(res => {
          this.setState({ 
            isLoading: false,
            link: `https://docs.google.com/spreadsheets/d/${res.result.spreadsheetId}/edit?usp=sharing`,
          });
          }, this.handleErrors)
      }, this.handleErrors)
    });
  }

  handleErrors(reason){
    let e = 'Something went wrong :( Try refreshing the page and submit the city again';
    if (reason.statusText){
      e = reason.statusText;
    }
    else if (reason.error === 'popup_closed_by_user'){
      e =  'Oh nooooo. We are unable to update the Google sheet without your authentication';
    }
    else if (reason.result.error){
      e = reason.result.error.message;
    }
    this.setState({ 
        error: e,
        isLoading: false
    });
  }

  createNewSheet(){
    const params = {
      spreadsheetId: SPREADSHEET_ID,
    };
    return window.gapi.client.sheets.spreadsheets.batchUpdate(params,
    {
        "requests": [{ "addSheet": { "properties": { "index": 0 }}}]}
    );
  }

  addDataToSheet(sheetTitle, data){
    let params = {
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetTitle}!A1`,
      valueInputOption: 'USER_ENTERED'
    };
    return window.gapi.client.sheets.spreadsheets.values.update(params,
      {
      "majorDimension": "ROWS",
      "values": data
      }
    );
  }

  render() {
    const {
      city, 
      country,
      error,
      isLoading,
      link,
      formSubmitted 
    } = this.state;

    return (
        <div className="interactions">
          {!formSubmitted ?
            <SearchForm
              city={city} 
              country={country}
              onChange={this.onInputChange}
              onSubmit={this.onSearchSubmit}
            />
            :
            null 
          }
          {isLoading ? 
            <Loading /> 
            :
            <div className="message ">
              <Link
                link = {link}
                error = {error}
              />
            </div>
          }
        </div>
    );
  }
}

export default HistoricalWeather;
