const csv = require('csv-parser');
const fs = require('fs');
var Promise = require('promise');

async function getData(fileName, csvRows,resolve, reject) {	
	fs.createReadStream(fileName)
  	.pipe(csv())
  	.on("error", (err) => {
    	console.log("FileName: "+fileName+"one error: ", err.message);        
	})
  	.on('data', (row) => {
  		/*doubt sharing across the promises need to syncronized acess*/
    	csvRows.push(row);
  		})
  	.on('end', () => {
  	 	resolve(csvRows);
		});
  	return csvRows;
}

function getDataFromAllCsv(files, callback){
var csvRows = [];
const promises = [];
files.map((item) => {
    promises.push( new Promise((resolve,reject) => {
    getData(item,csvRows, resolve, reject);

    }));
})
var proms = Promise.all(promises).then(() => console.log("csv data processed sucessfully...")).catch(error => console.log(`Error in csv data process ${error}`)) ;
proms.then(function(results) {
	return callback(csvRows);
	});
}


module.exports = getDataFromAllCsv;