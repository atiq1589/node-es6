import {render_file} from '../../render';

export class IndexView {
    constructor() {
        this.templateUrl = 'index.html';
    }
    
    RenderTemplate() {
        let data = {
            "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{ "name": "Jimmy", "age": "12" }, { "name": "Sally", "age": "4" }]
        };
        return render_file(this.templateUrl, data);
    }
}