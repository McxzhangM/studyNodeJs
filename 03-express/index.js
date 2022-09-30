const express = require('express');

const app = express();

const middleware1 = function(req, res, next){
    console.log('中间件1')
    next();
}

const middleware2 = function(req, res, next){
    console.log('中间件2')
    next();
}

const middleware3 = function(req, res, next){
    console.log('中间件3')
    res.send('hello express 中间件3')
}
const middlewareList = [middleware1, middleware2, middleware3];

app.get('/', middlewareList);

const server = app.listen(9000, function(){
    const address = server.address()

    console.log('address:', address);
});
