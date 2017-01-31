import express from 'express';
import { Settings } from './config';
import { Logger } from './logger';
import { render_file } from './render';

class Server {
    /**
     * This class will configure nodejs server using express framework
     */
    constructor() {
        this.port = process.env.PORT || 3000;
        this.server = express();
        this.server_mode = process.env.NODE_ENV || Settings.SERVER_MODE;
        this.log = new Logger();
    }
    RunServer() {
        try {
            this.server.listen(this.port, () => {
                this.log.info = `server running on port ${this.port}`;
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
        this.RouteListen();
    }
    get ServerMode() {
        return this.server_mode;
    }
    RouteListen() {
        this.server.get('/', (req, res) => {
             var data = {
                "name": "Alan", "hometown": "Somewhere, TX",
                "kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }]
            };
            let html = render_file('/../public/index.html', data);
            res.send(html);
        });
    }
}

(function () {
    let node = new MainServer();
    node.RunServer();
    switch (node.ServerMode) {
        case 'development':
            console.log('Server running in development mode');

    }
})();