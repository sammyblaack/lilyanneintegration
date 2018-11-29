//  File: getOrderListRecent.js
//  Package: byDesignApi
//
//  Created by Samuel Black on 29/11/2018.
//  Copyright (C) Yeah Good Creative 2018. All Rights Reserved.
//

module.exports = function (token, periodType, periodLength, evalDateLastModified) {
    
    // Modules
    var config = require('../config')
    var httpRequest = require('../httpRequest')

    var fs = require('fs')
    var xml2js = require('xml2js')

    var xmlParser = xml2js.parseString
    var xmlBuilder = xml2js.Builder

    // Variables
    var xmlPath = 'modules/bydesign/ordersapi/getOrderListRecent.xml'

    // Create a new promise
    var promise = new Promise(function (resolve, reject) {

        // Read xml file to buffer
        fs.readFile(xmlPath, function (err, data) {

            if (err) {
                console.log(err)
            }

            // Buffer to string
            var xmlString = data.toString()
        
            // Parse xml
            var xml = xmlParser(xmlString, function (err, res) {

                if (err) {
                    console.log(err)
                }

                // Envelope data
                res['soap12:Envelope']['soap12:Body'][0]['GetOrderListRecent'][0]['Credentials'][0].Username = config.username
                res['soap12:Envelope']['soap12:Body'][0]['GetOrderListRecent'][0]['Credentials'][0].Password = config.password
                res['soap12:Envelope']['soap12:Body'][0]['GetOrderListRecent'][0]['Credentials'][0].Token = token
                res['soap12:Envelope']['soap12:Body'][0]['GetOrderListRecent'][0].PeriodType = periodType
                res['soap12:Envelope']['soap12:Body'][0]['GetOrderListRecent'][0].PeriodLength = periodLength
                res['soap12:Envelope']['soap12:Body'][0]['GetOrderListRecent'][0].EvalDateLastModified = evalDateLastModified

                // Create new xml builder
                var builder = new xmlBuilder()

                // Return xml string
                resolve(builder.buildObject(res))
            })
        })
    })

    // Return promise
    return httpRequest(config.orderapi_path, promise)
}