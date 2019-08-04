const csv = require('csv-parser');
const fs = require('fs');
var Promise = require('promise');

  async function getData(fileName, csvRows,resolve, reject) {	
  	console.log(fileName);
	fs.createReadStream(fileName)
  .pipe(csv())
  .on('data', (row) => {
    csvRows.push(row);
  })
  .on('end', () => {
  	 resolve(csvRows);
});
  return csvRows;
}

function getDataFromAllCsv(files, callback){

var csvRows = [] ;
const promises = [];
  files.map((item) => {
    promises.push( new Promise((resolve,reject) => {
      getData(item,csvRows, resolve, reject);

    }));
})
var proms = Promise.all(promises).then(() => console.log("return csvRows")).catch(error => console.log(`Error in executing ${error}`)) ;
proms.then(function(results) {
 return callback(csvRows);
});
}


module.exports = getDataFromAllCsv;