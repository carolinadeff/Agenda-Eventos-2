class UsuarioDao {

    constructor(db) {
        this._db = db;
    }

    criaUsuario(usuario) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO usuarios (
                    nome,
                    email,
                    senha
                ) values (?,?,?)
                `,
                [
                    usuario.nome,
                    usuario.email,
                    usuario.senha
                ],
                function (err) {
                    if (err) { console.log(err) 
                        return reject('Não foi possível adicionar o usuário!')
                    }
                    return resolve()
                }
            )
        })
    }

    buscaPorEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM usuarios
                    WHERE email = ?
                `,
                [email]
                ,
                (erro, usuario) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o usuário!');
                    }

                    return resolve(usuario);
                }
            )
        });
    }


    buscaTodos() {
        return new Promise((resolve, reject) => {
            this._db.all(
                `
                    SELECT *
                    FROM usuarios
                `,
                (erro, usuarios) => {
                    if (erro) {
                        return reject('houve algum problema!');
                    }
                    return resolve(usuarios);
                }
            )
        });
    }

    buscaNome(id) {
        return new Promise((resolve, reject) => {
            this._db.all(
                `
                    SELECT nome
                    FROM usuarios
                    WHERE ID = ?
                `,[id],
                (erro, nome) => {
                    if (erro) {
                        return reject('houve algum problema!');
                    }
                    return resolve(nome);
                }
            )
        });
    }


}

module.exports = UsuarioDao;