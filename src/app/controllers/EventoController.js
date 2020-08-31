
const {
    tiposDeEvento,
    displayDataHorario
} = require('../utils/format');

const db = require('../../config/db');
const EventoDao = require('../infra/EventoDao');
const eventoDao = new EventoDao(db);



function todosEventos(req, res) {
    const idUsuario = req.params.id;
    const eventoSelecionado = {};

    eventoDao.buscaTodos(idUsuario)
        .then(eventos => displayDataHorario(eventos))
        .then(eventos => {
            return res.render('eventos.html', {tiposDeEvento, idUsuario, eventos, eventoSelecionado })
        })
        .catch(erro => console.log(erro))
}


function novoEvento(req, res) {
    const idUsuario = req.params.id;

    eventoDao.salvaEvento(req.body, idUsuario)
        .then(res.redirect(`/eventos/${idUsuario}`))
        .catch(erro => console.log(erro))
}


function salvaEventoEditado(req, res) {
    const evento = req.body;
    const idUsuario = req.params.id;

    eventoDao.atualiza(evento, idUsuario)
        .then(res.redirect(`/eventos/${idUsuario}`))
        .catch(erro => console.log(erro))
}


function editaEvento(req, res) {
    const idUsuario = req.params.id;
    const idEvento = req.params.idEvento;

    eventoDao.buscaTodos(idUsuario)
        .then(eventos => displayDataHorario(eventos))
        .then(eventos => {
            eventos.forEach(evento => {
                if (evento.id == idEvento) eventoSelecionado = evento;
            })
            console.log(eventoSelecionado)
            return res.render('eventos.html', { tiposDeEvento, idUsuario, eventos, eventoSelecionado })
        })
        .catch(erro => console.log(erro))
}


function apagaEvento(req, res) {
    const idUsuario = req.params.id;
    const idEvento = req.params.idEvento;

    eventoDao.remove(idEvento, idUsuario)
        .then(res.redirect(`/eventos/${idUsuario}`))
        .catch(erro => console.log(erro))
}



module.exports =  {
    todosEventos,
    novoEvento,
    salvaEventoEditado,
    editaEvento,
    apagaEvento
};