const Tarea = require("./tarea");

class Tareas {
    listado = {};


    get listadoArray() {
        const listado = [];
        Object.keys(this.listado).forEach(key => {
            const tarea = this.listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this.listado = {};
    }

    crearTarea(description = "") {
        const tarea = new Tarea(description);
        this.listado[tarea.id] = tarea;
    }

    cargarTareas(tareas = []) {
        tareas.forEach(tarea => {
            this.listado[tarea.id] = tarea;
        })
    }
    listarTareas() {
        console.log();
        this.listadoArray.forEach(({ description, complete }, index) => {
            const idx = `${index + 1}.-`.brightGreen;
            const desc = `${description}`;
            const task = complete ? `Complete`.brightBlue : `Pending`.brightRed;
            console.log(`${idx}${desc}::${task}`);
        })
    }
    listarCompletadas(completadas = true) {
        console.log();
        let index = 0;
        this.listadoArray.forEach(({ description, complete }) => {
            const desc = `${description}`;
            const task = complete ? `Complete`.brightBlue : `Pending`.brightRed;
            if (completadas) {
                if (complete) {
                    index++;
                    console.log(`${index.toString()}.-`.brightGreen + `${desc}::${task}`);
                }
            } else {
                if (!complete) {
                    index++;
                    console.log(`${index.toString()}.-`.brightGreen + `${desc}::${task}`);
                }
            }
        })
    }
    borrarTarea(id = '') {
        if (this.listado[id]) {
            delete this.listado[id];
        } else {
            return null;
        }
    }

    completarTareas(ids = []) {
        ids.forEach(id => {
            if (!this.listado[id].complete) {
                this.listado[id].complete = true;
            }
        });

        this.listadoArray.forEach(({ id }) => {
            if (!ids.includes(id)) {
                this.listado[id].complete = false;
            }
        })
    }
}

module.exports = Tareas;