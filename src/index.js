import express from 'express';
import handlebars from 'handlebars';
import fs from 'fs';
import { Settings } from './config';

// function send(req, res, html) {
//     console.log('send success');
//     res.send(html);
// }
// server.get('*', (req, res) => {
//     fs.readFile(__dirname + '/../public/index.html', 'utf-8', function (error, source) {
//         var data = {
//             "name": "Alan", "hometown": "Somewhere, TX",
//             "kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }]
//         };
//         var template = handlebars.compile(source);
//         setTimeout(function () {
//             var html = template(data);
//             send(req, res, html);
//         }, 5000);

//     });
// });
// server.use(express.static(__dirname + '/../public'));

class Server {
    /**
     * This class will configure nodejs server using express framework
     */
    constructor() {
        this.port = process.env.PORT || 3000;
        this.server = express();
        this.server_mode = process.env.NODE_ENV || Settings.SERVER_MODE;
        
    }
    RunServer() {
        try {
            this.server.listen(this.port, () => {
                console.log(`server running on port ${this.port}`);
            });
        } catch (error) {

        }
    }
}

class MainServer extends Server {
    /**
     * This class will start the node server
     */
    constructor() {
        super();
    }
    get ServerMode(){
        return this.server_mode;
    }
}


(function () {
    let node = new MainServer();
    node.RunServer();
    switch (node.ServerMode){
        case 'development':
            console.log('Server running in development mode');
            
    }
})();

export {MainServer};