const express = require('express');
const route = express.Router();

// data that ccomes from json files
const { getImgData, getSinglePage, getFullQuranV1 } = require('../controllers/jsonControllers');
route.get('/imgs', getImgData);
route.get('/page', getSinglePage);
route.get('/v1/quran-full', getFullQuranV1);

// data that comes from sqlite database
const { getFullQuranV2, getFullQuranV3, getAllSurahs, getAllAyahs } = require('../controllers/sqliteControllers');
route.get('/v2/quran-full', getFullQuranV2);
route.get('/v3/quran-full', getFullQuranV3);
route.get("/surahs", getAllSurahs);
route.get("/ayahs", getAllAyahs);

module.exports = route;