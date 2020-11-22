// Creating a json file for the API
/*
*** Do not use this if you do not know what this does. ***
*/

// read the json file
// const fs = require('fs');
// var file = fs.readFileSync('./data/imgData.json', 'utf8');
// console.log(file);

// Uncomment and run the script
/*
var obj = { 'items' : [] };
console.log(obj['items']);

for (var i = 1; i <= 604; i++) {
	obj['items'][i-1] = { "id": i, "imgURL": `http://localhost:5000/page?p=${i}` };
}

console.log(obj);
fs.writeFileSync('./data/imgData.json', JSON.stringify(obj));
*/