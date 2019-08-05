var getDataFromAllCsv = require('./csvParser.js');
var groupArray = require('group-array');
const args = process.argv.slice(2)
getDataFromAllCsv(args, function(response){
doCalculate(response);
})

function doCalculate(response){
	/*sorting data by price in asc order*/
	response.sort(function (itemA, itemB) {
 	 return parseFloat(itemB.Price) < parseFloat(itemA.Price);
	});
 	console.log("Cheapest product := " + response[0].ProductName +" Price := " + response[0].Price);
 	console.log("Costliest product := " + response[response.length-1].ProductName +" Price := " + response[response.length-1].Price);
 	/*Group data by Category*/
 	categoryMap = groupArray(response, 'Category');
 	Object.keys(categoryMap).forEach(function(key) {
		console.log("======================================================================================");
	    console.log("category := " +key);
	    var totalPrice = 0;
	    var totalQuantity =0;
	    /*iterating on list of product by category*/
	    categoryMap[key].forEach(function(element) {
	    	totalPrice += parseFloat(element.Price);
	    	totalQuantity += parseFloat(element.Min_Order_Quantity);
			});
	    console.log("totalPrice := " +totalPrice);
	    console.log("totalQuantity := " +totalQuantity);
	    console.log("Number of products per category := " +categoryMap[key].length);
	    console.log("Average price per category := "+ (totalPrice/totalQuantity));
	});
 }