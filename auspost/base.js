const axios = require('axios');
const apikey = "ruUybh4YrtotyG6jo6rQZky3ir5ME8Au";

//consuming order variables from server.js 
//var sourceFile = require('./var.js');
//console.log(sourceFile.variableName);

// defining parcel dimension variables
var frompostcode = '2634';
var topostcode = '3000';
var parcel_length = '22';
var parcel_width = '16';
var parcel_height = '7.7';
var parcel_weight = '1.5';

//function to get standard parcel box sizes
async function get_options() {
  axios({
    method: 'get', 
    url: 'https://digitalapi.auspost.com.au/postage/parcel/domestic/size.json ',
    headers: {
      'AUTH-KEY': 'apikey'
    }})
    .then(function(response) {
      console.log(JSON.stringify(response.data));
      console.log(response.statusText);
    })
    .catch(function(error) {
      console.log(error);
    })
}

//function to retrieve a list of services+prices
async function get_services() {
  axios({
    method: 'get', 
    url: 'https://digitalapi.auspost.com.au/postage/parcel/domestic/service.json',
    headers: {'AUTH-KEY': 'apikey'},
    params: {
      'length': parcel_length,
      'width': parcel_width,
      'height': parcel_height,
      'weight': parcel_weight,
      'from_postcode': frompostcode,
      'to_postcode': topostcode
    }
    })
    .then(function(response) {
      console.log(JSON.stringify(response.data));
      console.log(response.statusText);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

//function to get price based on service chosen
async function get_price() {
  axios({
    method: 'get', 
    url: 'https://digitalapi.auspost.com.au/postage/parcel/domestic/calculate.json',
    headers: {'AUTH-KEY': 'apikey'},
    params: {
      'length': parcel_length,
      'width': parcel_width,
      'height': parcel_height,
      'weight': parcel_weight,
      'from_postcode': frompostcode,
      'to_postcode': topostcode,
      'service_code': 'AUS_PARCEL_REGULAR'
    }
    })
    .then(function(response) {
      console.log(JSON.stringify(response.data));
      console.log(response.statusText);
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  get_price()

