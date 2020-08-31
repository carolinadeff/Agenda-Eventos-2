const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('data.db');

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nome VARCHAR(40) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    senha VARCHAR(255) NOT NULL
)
`;

const INSERIR_USUARIO_1 = 
`
INSERT INTO usuarios (
    nome, 
    email,
    senha
) SELECT 'Carolina', 'sdefferrari@gmail.com', '1234' WHERE NOT EXISTS (SELECT * FROM usuarios WHERE email = 'sdefferrari@gmail.com')
`;



const EVENTOS_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    evento TEXT NOT NULL, 
    data TEXT NOT NULL,
    hora TEXT NOT NULL,
    local TEXT NOT NULL,
    tipo TEXT NOT NULL,
    observacoes TEXT DEFAULT ('')
)
`;

bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
    bd.run(USUARIOS_SCHEMA);
    bd.run(INSERIR_USUARIO_1);
    bd.run(EVENTOS_SCHEMA);

    bd.each("SELECT * FROM usuarios", (err, usuario) => {
        console.log('Usuario: ');
        console.log(usuario);
    });
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;