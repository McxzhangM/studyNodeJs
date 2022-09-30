const http = require('http');
const { urlToHttpOptions } = require('url');

const server = http.createServer((req, res) => {
    // console.log('req:', req);
    // console.log('res:', res);
    const url = `http://127.0.0.1:8000${req.url}`;
    const myURL = new URL(url);
    filter(myURL, req, res)
})

function filter(url, request, response) {
    const { pathname } = urlToHttpOptions(url);
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('Access-Control-Allow-Origin', '*')
    switch (pathname) {
        case '/list': {
            console.log('list')
            response.write(JSON.stringify({
                page: url.searchParams.get('page'),
                size: url.searchParams.get('size'),
            }));
            response.end();
            break;
        }
        case '/sumNumber': {
            console.log('sumNumber')
            let fun = 'add'
            if (url.searchParams.get('callBack')) {
                fun = url.searchParams.get('callBack')
            }
            response.end(`${fun}(3,4)`);
            break;
        }
        case '/getDev': {
            response.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST')
            response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
            let value = '';
            request.on('data', (chunk)=>{
                value += chunk
            })
            request.on('end', ()=>{
                console.log('end', value)
                if (value === ''){
                    response.end();
                    return;
                }
                try{
                    value = JSON.parse(value)
                } catch(e){
                    console.log(e)
                }
                response.write(JSON.stringify({
                    devId: '321',
                    from: 'ki',
                }));
                response.end();
            })
            break;
        }
        default: {
            console.log('404')
            response.end(JSON.stringify(404));
            break;
        }
    }
}

console.log('server 8000');
server.listen(8000)
