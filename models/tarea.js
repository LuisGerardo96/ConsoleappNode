const { v4: uuidv4 } = require('uuid');
class Tarea {
    id = '';
    description = '';
    complete = false;

    constructor(desc) {
        this.id = uuidv4();
        this.description = desc;
    }
}

module.exports = Tarea;