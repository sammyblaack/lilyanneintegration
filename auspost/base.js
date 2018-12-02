const axios = require('axios');
const apikey = "ruUybh4YrtotyG6jo6rQZky3ir5ME8Au";

// defining parcel dimension variables
var frompostcode = "2000";
var topostcode = "3000";
var parcel_length = "22";
var parcel_width = "16";
var parcel_height = "7.7";
var parcel_weight = "1.5";

axios({
    method: 'get', 
    url: 'digitalapi.auspost.com.au/postage/parcel/domestic/size.json HTTP/1.1',
    headers: {
      'auth-key': 'ruUybh4YrtotyG6jo6rQZky3ir5ME8Au'
    }
  })