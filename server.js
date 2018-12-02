//  File: server.js
//  Package: lilyanneintegration
//
//  Created by Samuel Black on 29/11/2018.
//  Copyright (C) Yeah Good Creative 2018. All Rights Reserved.
//

// Modules
var byDesign = require('./modules/bydesign')

// DEBUG FUNCTION
function getOrders() {
    // Get orders from response
    byDesign.getOrderListRecent('', 'week', 1, 'false', function(ordersListRecent) {
        ordersListRecent = ordersListRecent['soap:Envelope']['soap:Body'][0]['GetOrderListRecentResponse'][0]['GetOrderListRecentResult'][0]['OrderList']

        // Create order object
        var orders = []

        // Iterate through each order
        for (order of ordersListRecent) {

            // Create object for current order
            

            // Get order info
            byDesign.getOrderInfoV2('', order.OrderID, function(orderInfo) {
                orderInfo = orderInfo['soap:Envelope']['soap:Body'][0]['GetOrderInfo_V2Response'][0]['GetOrderInfo_V2Result'][0]

                // Get order details info
                byDesign.getOrderDetailsInfoV2('', order.OrderID, function(orderDetailsInfo) {
                    orderDetailsInfo = orderDetailsInfo['soap:Envelope']['soap:Body'][0]['GetOrderDetailsInfo_V2Response'][0]['GetOrderDetailsInfo_V2Result'][0]['OrderDetailsResponse'][0]['OrderDetailsResponseV2']

                    // Array to hold details
                    var orderDetailsInfoArray = []

                    // Iterate through each order detail
                    for (detailInfo of orderDetailsInfo) {
                        var detailInfoObject = {
                            partyId: detailInfo.PartyID,
                            orderDetailId: detailInfo.OrderDetailID,
                            productId: detailInfo.ProductID,
                            description: detailInfo.Description,
                            quantity: detailInfo.Quantity,
                            price: detailInfo.Price,
                            volume: detailInfo.Volume,
                            tax: detailInfo.Tax,
                            taxableAmount: detailInfo.TaxableAmount,
                            groupOwner: detailInfo.GroupOwner,
                            parentOrderDetailId: detailInfo.ParentOrderDetailID,
                            warehouseName: detailInfo.WarehouseName,
                            warehouseEmail: detailInfo.WarehouseEmail,
                            warehousePackSlipLine1: detailInfo.WarehousePackSlipLine1,
                            warehousePackSlipLine2: detailInfo.WarehousePackSlipLine2,
                            warehousePackSlipLine3: detailInfo.WarehousePackSlipLine3,
                            warehousePackSlipLine4: detailInfo.WarehousePackSlipLine4,
                            warehousePackSlipLine5: detailInfo.WarehousePackSlipLine5,
                            warehousePackSlipLine6: detailInfo.WarehousePackSlipLine6,
                            warehousePickupLocation: detailInfo.WarehousePickupLocation,
                            warehouseCompanyTaxId: detailInfo.WarehouseCompanyTaxID,
                            warehouseIntlCompanyName: detailInfo.WarehouseIntlCompanyName,
                            warehousePackSlipTaxTitle: detailInfo.WarehousePackSlipTaxTitle,
                            warehousePackSlipTaxPercentage: detailInfo.WarehousePackSlipTaxPercentage,
                            packSlipProcessId: detailInfo.PackSlipProcessID,
                            volume2: detailInfo.Volume2,
                            volume3: detailInfo.Volume3,
                            volume4: detailInfo.Volume4,
                            otherPrice1: detailInfo.OtherPrice1,
                            otherPrice2: detailInfo.OtherPrice2,
                            otherPrice3: detailInfo.OtherPrice3,
                            otherPrice4: detailInfo.OtherPrice4,
                            packSlipProductId: detailInfo.PackSlipProductID,
                            packSlipBarcode: detailInfo.PackSlipBarcode
                        }

                        // Push object to array
                        orderDetailsInfoArray.push(detailInfoObject)
                    }

                    // Create a current order object
                    var currentOrder = {
                        orderId: order.OrderID, 
                        dateCreated: order.CreatedDate,
                        dateModified: order.LastModifiedDate,
                        orderInfo: {
                            repNumber: orderInfo.RepNumber,
                            customerNumber: orderInfo.CustomerNumber,
                            status: orderInfo.Status,
                            orderDate: orderInfo.OrderDate,
                            billName1: orderInfo.BillName1,
                            billName2: orderInfo.BillName1,
                            billStreet1: orderInfo.BillStreet1,
                            billStreet2: orderInfo.BillStreet1,
                            billCity: orderInfo.BillCity,
                            billState: orderInfo.BillState,
                            billPostalCode: orderInfo.BillPostalCode,
                            billCountry: orderInfo.BillCountry,
                            billEmail: orderInfo.BillEmail,
                            billPhone: orderInfo.BillPhone,
                            shipName1: orderInfo.ShipName1,
                            shipName2: orderInfo.ShipName2,
                            shipStreet1: orderInfo.ShipStreet1,
                            shipStreet2: orderInfo.ShipStreet2,
                            shipCity: orderInfo.ShipCity,
                            shipState: orderInfo.ShipState,
                            shipPostalCode: orderInfo.ShipPostalCode,
                            shipGeoCode: orderInfo.ShipGeoCode,
                            shipCountry: orderInfo.ShipCountry,
                            shipEmail: orderInfo.ShipEmail,
                            shipPhone: orderInfo.ShipPhone,
                            invoiceNotes: orderInfo.InvoiceNotes,
                            shipMethodId: orderInfo.ShipMethodID,
                            shipMethod: orderInfo.ShipMethod,
                            rankPriceType: orderInfo.RankPriceType,
                            partyId: orderInfo.PartyID,
                            currencyTypeId: orderInfo.CurrencyTypeID,
                            giftOrder: orderInfo.GiftOrder,
                            alternateShipMethodId: orderInfo.AlternateShipMethodID
                        },
                        orderDetailsInfo: orderDetailsInfoArray
                    }

                    // Add order to orders array    
                    orders += currentOrder
                })
            })
        }
    })
}