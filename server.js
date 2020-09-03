const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const { 
    validacoes,
    home,
    paginaCriacaoUsuario,
    criacaoUsuario,
    paginaLogin,
    efetuaLogin,
    efetuaLogout
} = require('./src/app/controllers/BaseController')

const {
    todosEventos,
    novoEvento,
    salvaEventoEditado,
    editaEvento,
    apagaEvento
} = require('./src/app/controllers/EventoController')


const nunjucks = require("nunjucks")
nunjucks.configure("./src/app/views", {
    express: app, 
    noCache: true
})



// middlewares e configs

app.use('/static', express.static("./src/app/public"))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}));

// chamada configuração da autenticacao e middleware de autorização

const sessaoAutenticacao = require('./src/config/sessaoAutenticacao');
sessaoAutenticacao(app);


app.use('/eventos*', function (req, res, next) {
    if (req.isAuthenticated()) {
        const user = 
        next()
    } else {
        res.redirect('/')
    }  
})


//ROTAS

// início:

app.get('/', home)

app.route('/novoUsuario')
    .get(paginaCriacaoUsuario)
    .post(validacoes(), criacaoUsuario)

app.route('/login')
    .get(paginaLogin)
    .post(efetuaLogin)

app.get('/logout', efetuaLogout)


// somente autenticado:

app.get('/eventos/:id', todosEventos)
    
app.route('/eventos/form/:id')
.post(novoEvento)
.put(salvaEventoEditado)

app.get('/eventos/form/edita/:id/:idEvento', editaEvento)

app.get('/eventos/form/apaga/:id/:idEvento', apagaEvento)


app.listen(3000)