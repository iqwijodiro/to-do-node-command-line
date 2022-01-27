const { time } = require('console');
const fs = require('fs');

let listToDo = [];

const saveDB = () => {
    let data = JSON.stringify(listToDo);

   fs.writeFile('db/data.json', data, err => {
       if (err) throw new Error('No se pudo guardar la tarea', err)
   });
}

const loadDB = () => {
    try {
        listToDo = require('../db/data.json');
    } catch (error) {
        listToDo = []
    }
}

const crear = (descripcion) => {

    loadDB();

    let toDo = {
        descripcion,
        completado: false
    };

    listToDo.push( toDo )
    saveDB();
    return toDo;
}

const getList = () => {
    loadDB();
    return listToDo;
}

const update = (descripcion, completado = true ) => {
    loadDB();

    let i = listToDo.findIndex( tarea => tarea.descripcion === descripcion);

    if (i >= 0 ) {
        listToDo[i].completado = completado;
        saveDB();
        return true;
    } else {
        return false;
    }
}


const borrar = (descripcion) => {
    loadDB();

    let newList = listToDo.filter( tarea => tarea.descripcion !== descripcion );

    if (listToDo.length === newList.length) {
        return false;
    } else {
        listToDo = newList;
        saveDB();
        return true;
    }
}


module.exports = {
    crear,
    getList,
    update,
    borrar
}