import express from 'express';
import path from 'path';
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
        this.LoadStatic();
    }
    get ServerMode() {
        return this.server_mode;
    }
    RouteListen() {
        Settings.MODULES.forEach(name => {
            let modulePath = `./app/${name}/urls`;
            let urls = require(modulePath).urls;
            urls.forEach(urlItem => {
                this.server.get(urlItem.url, (req, res) => {
                    let v = new urlItem.view();
                    res.send(v.RenderTemplate());
                });
            });
        });
    }
    LoadStatic(){
        Settings.STATIC_DIRS.forEach( staticPath => {
            this.server.use(Settings.STATIC_URL, express.static(path.join(__dirname, staticPath)));
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