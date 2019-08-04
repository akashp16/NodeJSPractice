var getDataFromAllCsv = require('./readCSV.js');
var groupArray = require('group-array');
const args = process.argv.slice(2)
 getDataFromAllCsv(args, function(response){
 	response.sort(function (itemA, itemB) {
  return itemB.Price < itemA.Price;
});
 	console.log(response[0].Age);
 	console.log(response[response.length-1].Age);
 	categoryMap = groupArray(response, 'Category');
 	console.log(categoryMap);

 if (arr.length){
    sum = arr.reduce(function(a, b) { return a + b; });
}

})

