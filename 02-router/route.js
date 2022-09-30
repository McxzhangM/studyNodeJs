const fs = require('fs');
const path = require('path');
const mime = require('mime');

function render(pathname, res, type = 'text/html') {
    const fileData = fs.readFileSync(pathname);
    res.setHeader('Content-Type', type);
    res.write(fileData, "utf-8");
    res.end();
}

const route = {
    "/login": (req, res) => {
        render('./static/login.html', res, 'text/html')
    },
    "/": (req, res) => {
        render('./static/home.html', res, 'text/html')
    },
    "/home": (req, res) => {
        render('./static/home.html', res, 'text/html')
    },
    "/404": (req, res) => {
        if (fileIsExit(req, res)) {
            return;
        }
        render('./static/404.html', res, 'text/html')
    }
}

function fileIsExit(req, res) {
    const myURL = new URL(req.url, 'http://127.0.0.1:8000');
    const pathname = myURL.pathname;
    const filePath = path.join(__dirname,'/static', pathname);
    try {
        if (fs.existsSync(filePath)) {
            const strList = pathname.split('.')
            const type = mime.getType(strList[strList.length - 1]);
            render(filePath, res, type);
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.warn(e)
    }
}

module.exports = route;
