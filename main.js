var getDataFromAllCsv = require('./readCSV.js');
var groupArray = require('group-array');
const args = process.argv.slice(2)
 getDataFromAllCsv(args, function(response){
 doCalculate(response);
})

function doCalculate(response){
	response.sort(function (itemA, itemB) {
  return itemB.Price < itemA.Price;
});
 	console.log("Cheapest product := " + response[0].ProductName +" Price := " + response[0].Price);
 	console.log("Costliest product := " + response[response.length-1].ProductName +" Price := " + response[response.length-1].Price);
 	categoryMap = groupArray(response, 'Category');
 	//console.log(categoryMap);

Object.keys(categoryMap).forEach(function(key) {
	console.log("======================================================================================");
    console.log("category := " +key);
    var totalPrice = 0;
    var totalQuantity =0;
    categoryMap[key].reduce(function(a, b) { totalPrice = a.Price + b.Price;totalQuantity=a.Min_Order_Quantity+b.Min_Order_Quantity; });
    console.log("totalPrice := " +totalPrice);
    console.log("totalQuantity := " +totalQuantity);
    console.log("Number of products per category := " +categoryMap[key].length);
    console.log("Average price per category := "+ (totalPrice/totalQuantity));
});
 

}