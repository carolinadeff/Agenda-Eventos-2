const { check, validationResult } = require('express-validator/check');

const db = require('../../config/db');
const UsuarioDao = require('../infra/UsuarioDao');
const usuarioDao = new UsuarioDao(db);

const { hoje } = require('../utils/format');

function validacoes(){
    return [
        check('nome').isAlpha().withMessage('O nome der conter somente letras.'),
        check('email').isEmail().withMessage('Forneça um email válido.'),
        check('senha').isLength({min: 4, max: 4}).withMessage('A senha deve conter 4 números.')
        ]
}


function home(req, res) {
    return res.render('index.html', { hoje })
}

function paginaCriacaoUsuario(req, res) {
    return res.render('novoUsuario.html', {mensagem: '', hoje})
}


function criacaoUsuario(req, res) {
    const erros = validationResult(req)
    const msgErro = erros.array().map(erro => erro.msg).join(' ')

    if(!erros.isEmpty()) {
        return res.render('novoUsuario.html', {mensagem: msgErro, hoje })
    }

    //FAZER LÓGICA PARA VER SE EMAIL JÁ EXISTE NO DB
    usuarioDao.buscaTodos()
        .then(usuarios => usuarios.some(usuario => req.body.email == usuario.email))
        .then(resultado => {
            if (resultado) {
                return res.render('novoUsuario.html', {mensagem: 'O email de usuário já está cadastrado.', hoje })
            }else{
                usuarioDao.criaUsuario(req.body)
                    .then(res.render('novoUsuario.html', {mensagem: 'Usuário criado com sucesso!', hoje}))
                    .catch(erro => res.render('novoUsuario.html', {mensagem: erro, hoje}))
            }
        })
        .catch(erro => console.log(erro));
}


function paginaLogin(req, res) {
    return res.render('login.html', { hoje })
}


function efetuaLogin(req, res, next) {

    const passport = req.passport;
    passport.authenticate('local', (erro, usuario, info) => {
        if (info) {
            return res.render('login.html', {info, hoje})
        }
        if (erro) {
            return next(erro)
        }

        req.login(usuario, (erro) => {
            if (erro) {
                return next(erro)
            }else{

                return res.redirect(`/eventos/${req.user.id}`)
            }
        })
    })(req, req, next)
}


function efetuaLogout(req, res) {
    req.logout();
    return res.redirect('/');
}



module.exports =  { 
    validacoes,
    home,
    paginaCriacaoUsuario,
    criacaoUsuario,
    paginaLogin,
    efetuaLogin,
    efetuaLogout
}