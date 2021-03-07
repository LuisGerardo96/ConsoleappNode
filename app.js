require('colors');
const { savedInformation, readDB } = require('./helpers/connectiondb');
const {
    inquirerMenu,
    pausa,
    input,
    borrarTarea,
    confirmacion,
    checkList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas')

const main = async() => {
    const tareas = new Tareas();
    const data = readDB();


    if (data) {
        tareas.cargarTareas(data);
    }

    let opt = '';

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await input('Description:');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listarTareas();
                break;
            case '3':
                tareas.listarCompletadas();
                break;
            case '4':
                tareas.listarCompletadas(false);
                break;
            case '5':
                const ids = await checkList(tareas.listadoArray);
                if (ids !== []) {
                    const confirm = await confirmacion('Do you want to change the status of these tasks?')
                    if (confirm) {
                        tareas.completarTareas(ids);
                        console.log('Tasks changed'.brightBlue);
                    }
                }
                break;
            case '6':
                const id = await borrarTarea(tareas.listadoArray);
                if (id !== '0') {
                    const ok = await confirmacion('¿Are you shure about this ?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log(`Task deleted `.brightRed);
                    }
                }
                break;
        }
        savedInformation(tareas.listadoArray)
        await pausa();
    } while (opt !== '0')
}

main();