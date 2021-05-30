const sqlite3 = require("sqlite3").verbose();
const path = require('path');
const rootDir = process.env.PWD;

const db_name = path.join(rootDir, "data", "db", "quran.db");
const db = new sqlite3.Database(db_name, (err) => {
	if (err) return console.error(err.message);
	// console.log("Successful connection to the database 'quran.db'");
});

const sql_create_surahs = `CREATE TABLE IF NOT EXISTS Surahs (
	Surah_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	number INTEGER not NULL,
	name STRING utf8, 
	englishName STRING utf8, 
	englishNameTranslation STRING utf8, 
	revelationType STRING utf8, 
	banglaName STRING utf8 
);`;
db.run(sql_create_surahs, (err) => {
	if (err) return console.error(err.message);
	// console.log("Successful creation of the 'Surahs' table");
});

const sql_create_ayahs = `CREATE TABLE IF NOT EXISTS Ayahs (
	Ayah_ID INTEGER PRIMARY KEY AUTOINCREMENT,
	number INTEGER not NULL,
	numberInSurah INTEGER,
	surah INTEGER,
	audio STRING utf8,
	text STRING utf8,
	juz INTEGER,
	manzil INTEGER,
	page INTEGER,
	ruku INTEGER,
	hizbQuarter INTEGER,
	sajda BOOLEAN,
	pngImage STRING utf8,
	textInEnglish STRING utf8,
	textInBangla STRING utf8
);`;
db.run(sql_create_ayahs, (err) => {
	if (err) return console.error(err.message);
	// console.log("Successful creation of the 'Ayahs' table");
});

module.exports = db;