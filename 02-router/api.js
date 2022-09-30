
const route = {
    "/api/getUserName": (req, res, myURL) => {
        const userId = myURL.searchParams.get('userId')
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({
            userName: '张三',
            userId,
        }));
        res.end();
    },
    "/api/getList": (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({
            data: '[可乐,雪碧,咖啡,牛奶]',
            total: 4
        }));
        res.end();
    },
    "/api/post/setFeat": (req, res) => {
        let value = '';
        req.on('data', (chunk) => {
            value += chunk;
        })
        req.on('end', () => {
            try {
                value = JSON.parse(value);
            } catch(e) {
                console.log('/api/post/setFeat catch:', e);
            }
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                code: 'success',
                data: true,
                feat: value?.feat || '',
            }));
            res.end();
        })
    },
}

module.exports = route;
