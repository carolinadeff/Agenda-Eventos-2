const uuid = require('uuid/v4');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UsuarioDao = require('../app/infra/UsuarioDao');
const db = require('./db');

module.exports = (app) => {

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            const usuarioDao = new UsuarioDao(db);
            usuarioDao.buscaPorEmail(email)
                .then(usuario => {
                    if (!usuario || senha != usuario.senha) {
                        return done(null, false, {
                            mensagem: 'Login e senha incorretos!'
                        });
                    }
                    ;
                    return done(null, usuario);
                })
                .catch(erro => done(erro, false));
        }
    ));

    passport.serializeUser((usuario, done) => {
        const usuarioSessao = {
            nome: usuario.nome,
            email: usuario.email,
        }
        done(null, usuarioSessao);
    });

    passport.deserializeUser((usuarioSessao, done) => {
        done(null, usuarioSessao);
    })

    app.use(session({
        secret: 'agenda lola',
        genid: function(req) {
            return uuid()
    },
    resave: false,
    saveUninitialized: false
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function(req, res, next) {
        req.passport = passport;
        next();
        
    })

}