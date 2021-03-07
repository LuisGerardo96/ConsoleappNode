const inquirer = require('inquirer');

const options = [{
    type: 'list',
    message: 'Select the option'.brightGreen,
    name: 'opt',
    choices: [{
            value: '1',
            name: '1.Create Task`'
        },
        {
            value: '2',
            name: '2.Show all Tasks'
        },
        {
            value: '3',
            name: '3.Show complete Tasks'
        },
        {
            value: '4',
            name: '4.Show to-do Task'
        },
        {
            value: '5',
            name: '5.Check Task(s)'
        },
        {
            value: '6',
            name: '6.Remove Task'
        },
        {
            value: '0',
            name: '0.Exit'
        }
    ]
}];



const inquirerMenu = async() => {
    console.log('To-Do Console Application'.brightRed);
    console.log('========================='.brightCyan);
    console.log('====Choose one option===='.brightYellow);
    console.log('=========================\n'.brightCyan);
    const { opt } = await inquirer.prompt(options);
    return opt;
}
const pausa = async() => {
    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'Enter'.brightGreen} to Continue`
    }]
    console.log('\n');
    await inquirer.prompt(question)
};
const input = async(message) => {
    const question = [{
        type: 'input',
        name: 'description',
        message,
        validate(value) {
            if (value.length === 0)
                return 'You must enter at least one character';
            return true;
        }
    }]
    const { description } = await inquirer.prompt(question);
    return description
}
const borrarTarea = async(tareas = []) => {
    const choices = tareas.map(({ id, description }, i) => {
        const index = `${i + 1}.-`.brightGreen;
        return {
            value: id,
            name: `${index}${description}`
        }
    });

    choices.unshift({
        value: '0',
        name: `0.-`.brightGreen + 'Cancelar'
    });
    const options = [{
        type: 'list',
        message: 'Select the task to delete'.brightGreen,
        name: 'id',
        choices
    }];
    const { id } = await inquirer.prompt(options);
    return id;
}

const checkList = async(tareas = []) => {
    const choices = tareas.map(({ id, description, complete }, i) => {
        const index = `${i + 1}.-`.brightGreen;
        return {
            value: id,
            name: `${index}${description}`,
            checked: (complete) ? true : false
        }
    });
    const options = [{
        type: 'checkbox',
        message: 'Select the tasks to change status'.brightGreen,
        name: 'ids',
        choices
    }];
    const { ids } = await inquirer.prompt(options);
    return ids;
}
const confirmacion = async(msg) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message: msg
    }];
    const { ok } = await inquirer.prompt(question);
    return ok
}

module.exports = {
    inquirerMenu,
    pausa,
    input,
    borrarTarea,
    confirmacion,
    checkList
}