const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const path = require('path');
const fs = require('fs');

const db = require('./sqliteModel.js');

app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, './index.html'));
})
app.get('/home', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, './index.html'));
})

app.get('/api/imgs', (req, res) => {
	fs.readFile(path.join(__dirname, '/data/imgData.json'), 'utf-8', (err, data) => {
		if(!err) res.status(200).json(JSON.parse(data));
		else { res.status(404).json({error: '404 not found'}); throw err; }
	})
})

app.get('/api/page', (req, res) => {
	const pageNo = req.query.p;
	// console.log(pageNo); // outputs undefined if not in query string
	if (pageNo !== undefined && pageNo !== 'undefined' && pageNo > 0 && pageNo <= 604) {
		res.status(200).sendFile(path.join(__dirname, `/quran-images/${pageNo}.png`));
	} else {
		res.status(404).send('<h1>404, Page not found </h1>');
	}
})


app.get('/api/v1/quran-full', (req, res) => {
	fs.readFile(path.join(__dirname, '/data/Quran-min.json'), 'utf-8', (err, data) => {
		if(!err) res.status(200).json(JSON.parse(data));
		else { res.status(404).json({error: '404 not found'}); throw err; }
	})
})

app.get('/api/v2/quran-full', (req, res) => {
	var ayahs;
	fs.readFile(path.join(__dirname, '/data/ayahs.json'), 'utf-8', (err, data) => {
		if(err) { res.status(500).json({error: 'Internal server error'}); throw err; }
		else {
			ayahs = JSON.parse(data).ayahs;
			db.all("SELECT * FROM Surahs ORDER BY number", [], (err, surahs) => {
				if (err) { res.status(500).json({error: 'Internal server error'}); throw err; }
				else {
					surahs.forEach((surah, i) => {
						let arr = ayahs.filter(ayah => ayah.surah === i+1);
						surah.ayahs = arr;
					});
					res.status(200).json( { surahs: surahs } );
				}		
			})
		}
	})
})

app.get('/api/v3/quran-full', (req, res) => {
	db.all(`SELECT * FROM Ayahs ORDER BY number`, [], (err, ayahs) => {
		if (err) { res.status(500).json({error: 'Internal server error'}); throw err; }
		else {
			db.all("SELECT * FROM Surahs ORDER BY number", [], (err, surahs) => {
				if (err) return console.error(err.message);
				else {
					surahs.forEach((surah, i) => {
						let arr = ayahs.filter(ayah => ayah.surah === i+1)
						surah.ayahs = arr;
					});
					res.status(200).json( {surahs: surahs} );
				}
			})
		}
	})
})


app.get("/api/surahs", (req, res) => {
	const sql = "SELECT * FROM Surahs ORDER BY number";
	db.all(sql, [], (err, rows) => {
		if (err) {
			return console.error(err.message);
		}
		res.status(200).json( { surahs: rows } );
	});
});
app.get("/api/ayahs", (req, res) => {
	const sql = "SELECT * FROM Ayahs ORDER BY number";
	db.all(sql, [], (err, rows) => {
		if (err) {
			return console.error(err.message);
		}
		res.status(200).json( { ayahs: rows } );
	});
});


// 404 PAGE
app.use((req, res, next) => {
   res.status(404).send('<h1>404, Page not found </h1>');
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`running on server port: ${PORT}`);
});