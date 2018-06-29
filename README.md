# Historical Weather Data Sheets :sunny: :umbrella: :cloud: 

This service retrieves historical weather data for a submitted city and exports the data as a new sheet into a Google Spreadsheet. Each row in the new sheet represents a day and the columns are data that can help visualize weather trends. Uses Weatherbit Historical Weather API to get weather data and Google Sheet API to edit the spreadsheet.


A FrontEnd Javascript application built using [React](https://reactjs.org/). This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Example Usage

To retrieve historical weather data for a particular city, submit city and country:

  <kbd>
     <img src="https://res.cloudinary.com/maribelduran/image/upload/c_scale,w_500/v1530273780/Weather_fillForm.png"> 
  </kbd>


## Example Output
 
   You can check out the new data here: https://docs.google.com/spreadsheets/d/1plgIyhW093-gRVzZwIO8L_ToTGcAr7xQ9AzDOz2qO0E/edit?usp=sharing
  
 A new tab in the Googlesheet has been created to add the new data:
 
 *Note: The free plan for Weatherbit Historical Weather API only allows 1 days worth of historical weather data (Similar issue with other weather services). Ideally, with a paid service, we would be able to export years worth of data.
 
 <kbd>
     <img src="http://res.cloudinary.com/maribelduran/image/upload/c_scale,w_500/v1530273784/HistoricalWeatherGoogleSpreadhseet_o7b7mt.png"> 
 </kbd>
  


## To Run Project Locally

### Prerequisites
In order to run this project locally, you should have the following installed:

- [NPM](https://www.npmjs.com/)

You should also:
  1) Set up a Google Sheets API:
Register a new app and enable “Google Sheets API” (https://console.developers.google.com). Click “Create credentials” and select “API Key”. Click the “Restrict Key” and set a name for it. Under “Application Restrictions” set it to “HTTP referrers” and add http://<i></i>localhost:3000<i></i> for now. Under “API Restrictions” select the “Google Sheets API” and save. <b>Make a note of the API key.</b>
      
  2) Obtain OAuth 2.0 credentials from the Google API Console: Click "Create credentials" > OAuth client ID. Set the application type to Web application. Add http://<i></i>localhost:3000<i></i> as an Authorized Javascript origins. <b>Make a note of the Client ID.</b> *Since the application is modifying a spreadsheet, OAuth 2.0 for this app is necessary.*
      
  3) Signup for a Weatherbit API key (https://www.weatherbit.io/api). <b>Make a note of the API key.</b>


### Installation & Startup
1) Fork this repo
2) Clone the fork
3) Install Dependencies: `$ npm install`
4) Add a .env.development.local file to your project's root directory and set REACT_APP_WEATHERBIT_APIKEY to your weatherbit API key
      ``` JavaScript 
      REACT_APP_WEATHERBIT_APIKEY=<your_weatherbit_api_key>
      ```

    <kbd>
     <img src="https://res.cloudinary.com/maribelduran/image/upload/c_scale,w_500/v1530261959/historical_weather_googlevals.png"> 
    </kbd>

5) You wil also need your Google API Key and Client ID in the .env.development.local file and name them REACT_APP_GOOGLE_APIKEY and
REACT_APP_GOOGLE_CLIENTID, respectively
      ``` JavaScript 
        REACT_APP_GOOGLE_APIKEY=<your_google__api_key>
        REACT_APP_GOOGLE_CLIENTID=<your_google_client_id>
      ```
      <kbd>
      <img src="https://res.cloudinary.com/maribelduran/image/upload/c_scale,w_500/v1530261957/historical_weather_weatherbitapikey.png">
      </kbd>

6) Start the Development Server: `$ npm start`
7) Visit http://localhost:3000/

Enjoy! :blue_heart:


## TODOs
- Use local storage to cache cities already requested on the same day 
- Add date range picker based on weather api historical data availabiliy
- Add more error handling
- Add more data points

