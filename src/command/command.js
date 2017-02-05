#! /usr/bin/env node
import fs from 'fs';
import { MainServer } from '../index';

class Command {
    constructor() {
        this.rootDir = __dirname + '/..';
        this.temProtoProject = 'temProtoProject';
        this.args = process.argv;
        console.log(this.args);
    }
}

let cmd = new Command();

for (let i = 0; i < cmd.args.length; i++) {
    let command = cmd.args[i];
            console.log(command);
    
    switch (command) {
        case 'newproject':
            var dir = cmd.args[i + 1];
            console.log(`${cmd.rootDir}/${cmd.temProtoProject}`);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                fs.mkdirSync(dir + '/' + dir);
                fs.createReadStream(`${cmd.rootDir}/${cmd.temProtoProject}/command.js`).pipe(fs.createWriteStream(`${dir}/command.js`));
                fs.createReadStream(`${cmd.rootDir}/${cmd.temProtoProject}/config.js`).pipe(fs.createWriteStream(`${dir}/${dir}/config.js`));
                fs.createReadStream(`${cmd.rootDir}/${cmd.temProtoProject}/urls.js`).pipe(fs.createWriteStream(`${dir}/${dir}/urls.js`));
                fs.createReadStream(`${cmd.rootDir}/${cmd.temProtoProject}/view.js`).pipe(fs.createWriteStream(`${dir}/${dir}/view.js`));
            }
            break;
        case 'startserver':
            console.log(cmd.args[i + 1]);
            let node = new MainServer(null, null, cmd.args[i + 1]);
            node.RunServer();
            break;
    }
}



