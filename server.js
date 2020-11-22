const http = require('http');
const url = require('url');
const fs = require('fs');
const data = require('./data/imgData.json');

const server = http.createServer((req, res) => {
	
	const parsedURL = url.parse(req.url, true);
	const search = parsedURL.search;
	// const baseURL = req.headers.host + parsedURL.path;
	// console.log(parsedURL.query);
	const path = parsedURL.path;
	if (path === '/' || path === '/home' && req.method === 'GET') 
	{
		res.writeHead(200, { 'Content-Type': 'text/html' });
		fs.createReadStream('./index.html').pipe(res);
	}
	else if (path === '/api/imgs' && req.method === 'GET') 
	{
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(data));
	}
	else if (path === '/page/' && req.method === 'GET')
	{
		console.log(req.file);
		// var imgPath = path.join(__dirname, '/quran-images/1.png');
		// var image = fs.readFileSync(imgPath);
		// res.end(image);
		// same as 3 lines of code
		fs.createReadStream(__dirname + '/quran-images/1.png').pipe(res);
	}
	else if (search !==null && req.method === 'GET') 
	{
		// console.log(search);
		const pageNo = parsedURL.query['p'];
		// console.log(pageNo); // outputs undefined if nor in query string
		if (pageNo !== undefined && pageNo !== 'undefined' && 
			pageNo > 0 && pageNo <= 604) 
		{
			res.writeHead(200, { 'Content-Type': 'image/png' });
			fs.createReadStream(__dirname + `/quran-images/${pageNo}.png`).pipe(res);
		} 
		else 
		{
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end("<h1>404 Not found</h1>");
		}
	}
	else 
	{
		res.writeHead(404, { 'Content-Type': 'text/html' });
		res.end("<h1>404 Not found</h1>");
	}


})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`running on server port: ${PORT}`);
});