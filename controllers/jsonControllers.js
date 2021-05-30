const fs = require('fs');
const path = require('path');
const rootDir = process.env.PWD;

const getImgData = (req, res) => {
	fs.readFile(path.join(rootDir, 'data', 'imgData.json'), 'utf-8', (err, data) => {
		if(!err) res.status(200).json(JSON.parse(data));
		else { res.status(404).json({error: '404 not found'}); throw err; }
	})
}

const getSinglePage =  (req, res) => {
	const pageNo = req.query.p;
	// console.log(pageNo); // outputs undefined if not in query string
	if (pageNo !== undefined && pageNo !== 'undefined' && pageNo > 0 && pageNo <= 604) {
		res.status(200).sendFile(path.join(rootDir, 'data', 'quran-images', `${pageNo}.png`));
	} else {
		res.status(404).send('<h1>404, Page not found </h1>');
	}
}

const getFullQuranV1 = (req, res) => {
	fs.readFile(path.join(rootDir, 'data', 'Quran-min.json'), 'utf-8', (err, data) => {
		if(!err) res.status(200).json(JSON.parse(data));
		else { res.status(404).json({error: '404 not found'}); throw err; }
	})
}


module.exports = { getImgData, getSinglePage, getFullQuranV1 }