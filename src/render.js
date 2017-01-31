import handlebars from 'handlebars';
import {Settings} from './config';
import fs from 'fs';

export class Renderer {
    /**
     * This method will render a file 
     * It will currently use handlebars
     */
    constructor(filePath, data) {
        this.filePath = __dirname + Settings.TEMPLATE_PATH + filePath;
        this.data = data;
        this.renderedFile = "";
        this._RenderFile();
    }
    _RenderFile() {
        try {
            let file = fs.readFileSync(this.filePath, 'utf-8');
            let template = handlebars.compile(file);
            this.renderedFile = template(this.data);
            return this.renderedFile;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export function render_file(filePath, data) {
    let r = new Renderer(filePath, data);
    return r.renderedFile;
}
