const http = require('http');

const route = require('./route.js');
const api = require('./api.js');

const Router = {...route, ...api};

const server = http.createServer((req, res) => {
    const myURL = new URL(req.url, 'http://127.0.0.1:8000');
    res.setHeader('Access-Control-Allow-Origin', '*')
    const pathname = myURL.pathname;
    try {
        Router[pathname](req, res, myURL);
    }catch(e){
        Router['/404'](req, res)
    }
})

console.log('server 8000');
server.listen(8000)
