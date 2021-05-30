const fs = require('fs');
const path = require('path');
const rootDir = process.env.PWD;
const db = require('../sqliteModel.js');

const getFullQuranV2 = (req, res) => {
	var ayahs;
	fs.readFile(path.join(rootDir, 'data', 'ayahs.json'), 'utf-8', (err, data) => {
		if(err) { res.status(500).json({error: 'Internal server error'}); return console.error(err); }
		else {
			ayahs = JSON.parse(data).ayahs;
			db.all("SELECT * FROM Surahs ORDER BY number", [], (err, surahs) => {
				if (err) { res.status(500).json({error: 'Internal server error'}); return console.error(err); }
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
}

const getFullQuranV3 = (req, res) => {
	db.all("SELECT * FROM Ayahs ORDER BY number", [], (err, ayahs) => {
		if (err) { res.status(500).json({error: 'Internal server error'}); return console.error(err); }
		else {
			db.all("SELECT * FROM Surahs ORDER BY number", [], (err, surahs) => {
				if (err) { res.status(500).json({error: 'Internal server error'}); return console.error(err); }
				else {
					surahs.forEach((surah, i) => {
						let arr = ayahs.filter(ayah => ayah.surah === i+1);
						surah.ayahs = arr;
					});
					res.status(200).json( {surahs: surahByPage} );
				}
			})
		}
	})
}

const getAllSurahs = (req, res) => {
	const { rev } = req.query;
	let sql_query = '';

	if (rev) {
		sql_query = `SELECT * FROM (Surahs) WHERE revelationType="${rev}" ORDER BY number`;
	} else {
		sql_query = "SELECT * FROM (Surahs) ORDER BY number";
	}
	db.all(sql_query, [], (err, rows) => {
		if (err) { res.status(500).json({error: err.message}); return console.error(err); }
		res.status(200).json( { surahs: rows } );
	});
}

const getAllAyahs = (req, res) => {
	const { page, surah, sajda, para } = req.query;
	// console.log(page, surah);
	let sql_query = '';

	if (page && surah && sajda && para
			|| page && surah || page && sajda || page && para 
			|| surah && sajda || surah && para
			|| sajda && para
		) {
		res.status(404).json({error: 'Please query one parameter.'}); 
		return;
	}

	if (page && page > 0 && page <= 604) {
		sql_query = `SELECT * FROM (Ayahs) WHERE page=${page} ORDER BY number`;
	} else if (surah && surah > 0 && surah <= 114) {
		sql_query = `SELECT * FROM (Ayahs) WHERE surah=${surah} ORDER BY number`;
	} else if (sajda) {
		if (sajda === 'false' || sajda === 'no') {
			sql_query = `SELECT * FROM (Ayahs) WHERE sajda=false ORDER BY number`;
		}
		else sql_query = `SELECT * FROM (Ayahs) WHERE sajda=true ORDER BY number`;
	} else if (para && para > 0 && para <= 30) {
		sql_query = `SELECT * FROM (Ayahs) WHERE juz=${para} ORDER BY number`;
	} else {
		sql_query = "SELECT * FROM (Ayahs) ORDER BY number";
	}

	db.all(sql_query, [], (err, rows) => {
		if (err) { res.status(500).json({error: 'Internal server error'}); return console.error(err); }
		res.status(200).json( { ayahs: rows } );
	});
}


module.exports = { getFullQuranV2, getFullQuranV3, getAllSurahs, getAllAyahs }