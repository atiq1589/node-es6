import express from 'express';
import handlebars from 'handlebars';
import fs from 'fs';

const server = express();
const SERVER_MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    console.log(`server running on ${SERVER_MODE}`);
});
function send(req, res, html) {
    console.log('send success');
    res.send(html);
}
server.get('*', (req, res) => {
    fs.readFile(__dirname + '/../public/index.html', 'utf-8', function (error, source) {
        var data = {
            "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }]
        };
        var template = handlebars.compile(source);
        setTimeout(function () {
            var html = template(data);
            send(req, res, html);
        }, 5000);

    });
});
server.use(express.static(__dirname + '/../public'));
