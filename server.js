const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const path = require('path');
const fs = require('fs');


app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, 'index.html'));
})
app.get('/home', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, 'index.html'));
})

// API routes
const apiRoute = require('./routes/apiRoutes');
app.use('/api', apiRoute);



// 404 PAGE
app.use((req, res, next) => {
   res.status(404).send('<h1>404, Page not found </h1>');
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`running on server port: ${PORT}`);
});