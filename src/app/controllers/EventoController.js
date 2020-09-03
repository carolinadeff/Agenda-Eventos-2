
const {
    tiposDeEvento,
    displayDataHorario,
    hoje
} = require('../utils/format');

const db = require('../../config/db');
const EventoDao = require('../infra/EventoDao');
const eventoDao = new EventoDao(db);
const UsuarioDao = require('../infra/UsuarioDao');
const usuarioDao = new UsuarioDao(db);



function todosEventos(req, res) {
    const idUsuario = req.params.id;
    const eventoSelecionado = {};
    var nomeUsuario;
    usuarioDao.buscaNome(idUsuario).then(usuario => nomeUsuario = usuario[0].nome)

    eventoDao.buscaTodos(idUsuario)
        .then(eventos => displayDataHorario(eventos))
        .then(eventos => {
            return res.render('eventos.html', {tiposDeEvento, idUsuario, eventos, eventoSelecionado, hoje, nomeUsuario })
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
    var nomeUsuario;
    usuarioDao.buscaNome(idUsuario).then(usuario => nomeUsuario = usuario[0].nome)

    eventoDao.buscaTodos(idUsuario)
        .then(eventos => {
            eventos.forEach(evento => {
                if (evento.id == idEvento) {
                    eventoSelecionado = JSON.parse(JSON.stringify(evento));
                }
            })
            eventos = displayDataHorario(eventos)
            return res.render('eventos.html', { tiposDeEvento, idUsuario, eventos, eventoSelecionado, hoje, nomeUsuario })
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