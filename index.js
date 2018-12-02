const XeroClient = require('xero-node').AccountingAPIClient;

// Config Stuff for authenticating with Xero Account
const config = {
    "appType" : "private",
    "consumerKey": "K1NA1PB857ZP0FNUAN6HI8OR2VLCWH",
    "consumerSecret": "FVSQXNLVLBNRYKM25USJTPKF8MHEAO",
    "privateKeyPath": "privatekey.pem"
  };

// Function to create invoice in Xero
  (async function(){
    let xero = new XeroClient(config);

    await xero.invoices.create({
  "Type": "ACCREC",
  "Contact": { 
    "ContactID": "dc99a067-03c6-4f12-8fc1-9b8c9a015bde" 
  },
  "DueDate": "\/Date(1518685950940+0000)\/",
  "LineItems": [
    {
      "Description": "Services as agreed",
      "Quantity": "4",
      "UnitAmount": "100.00",
      "AccountCode": "200"
    }
  ],
  "Status": "AUTHORISED"     
    })

// Function to create new customer  
    await xero.contacts.create({
      "Name": "Phillip"

    })


  })();