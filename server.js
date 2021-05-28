const express = require('express');
const app = express();
const cors = require('cors');

const path = require('path');
const fs = require('fs');
// const data = require('./data/imgData.json');

app.use(cors());

app.get('/', (req, res) => {
	console.log('here');
	res.status(200).sendFile(path.join(__dirname, './index.html'));
})
app.get('/home', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, './index.html'));
})

app.get('/api/imgs', (req, res) => {
	fs.readFile(path.join(__dirname, '/data/imgData.json'), 'utf-8', (err, data) => {
		if(!err) res.status(200).json(JSON.parse(data));
		else {
			res.status(404).json({error: '404 not found'})
			throw err;
		}
	})
})

app.get('/api/quran-full', (req, res) => {
	fs.readFile(path.join(__dirname, '/data/Quran-min.json'), 'utf-8', (err, data) => {
		if(!err) res.status(200).json(JSON.parse(data));
		else {
			res.status(404).json({error: '404 not found'})
			throw err;
		}
	})
})

app.get('/page', (req, res) => {
	const pageNo = req.query.p;
	console.log(pageNo); // outputs undefined if nor in query string
	if (pageNo !== undefined && pageNo !== 'undefined' && pageNo > 0 && pageNo <= 604) {
		res.status(200).sendFile(path.join(__dirname, `/quran-images/${pageNo}.png`));
	} 
	else {
		res.status(404).send('<h1>404, Page not found </h1>');
	}
})

// 404 PAGE
app.use((req, res,next) => {
   res.status(404).send('<h1>404, Page not found </h1>');
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`running on server port: ${PORT}`);
});