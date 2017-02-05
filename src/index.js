import express from 'express';
import path from 'path';
import { Logger } from './logger';
import { render_file } from './render';

class Server {
    /**
     * This class will configure nodejs server using express framework
     */
    constructor(port, mode, rootDir) {
        this.rootDir = rootDir;
        let projName = this.rootDir.split('/');
        projName = projName[projName.length - 1];
        this.Settings = require(this.rootDir + '/' + projName + '/config').Settings;

        this.port = process.env.PORT || port || 3000;
        this.server = express();
        this.server_mode = process.env.NODE_ENV || mode || this.Settings.SERVER_MODE;
        
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

export class MainServer extends Server {
    /**
     * This class will start the node server
     */
    constructor(port, mode, rootDir) {
        super(port, mode, rootDir);
        this.RouteListen();
        this.LoadStatic();
    }
    get ServerMode() {
        return this.server_mode;
    }
    RouteListen() {
        this.Settings.MODULES.forEach(name => {
            let modulePath = `${this.rootDir}/${name}/urls`;
            let urls = require(modulePath).urls;
            urls.forEach(urlItem => {
                this.server.get(urlItem.url, (req, res) => {
                    let v = new urlItem.view();
                    res.send(v.RenderTemplate());
                });
            });
        });
    }
    LoadStatic() {
        this.Settings.STATIC_DIRS.forEach(staticPath => {
            this.server.use(this.Settings.STATIC_URL, express.static(path.join(__dirname, staticPath)));
        });
    }
}

// (function () {
//     let node = new MainServer();
//     node.RunServer();
//     switch (node.ServerMode) {
//         case 'development':
//             console.log('Server running in development mode');

//     }
// })();