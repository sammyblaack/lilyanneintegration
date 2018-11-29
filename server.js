//  File: server.js
//  Package: lilyanneintegration
//
//  Created by Samuel Black on 29/11/2018.
//  Copyright (C) Yeah Good Creative 2018. All Rights Reserved.
//


// Modules
var byDesign = require('./modules/bydesign')

var promise = byDesign.getOrderListRecent('', 'week', 1, 'false')

promise.then(function(result) {
    console.log(result)
},
function(reject) {

})