class EventoDao {

    constructor(db) {
        this._db = db;
    }

    salvaEvento(evento, id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO eventos (
                    usuario_id,
                    evento,
                    data,
                    hora,
                    local,
                    tipo,
                    observacoes
                ) values (?,?,?,?,?,?,?)
                `,
                [
                    id,
                    evento.evento,
                    evento.dataEvento,
                    evento.horaEvento,
                    evento.localEvento,
                    evento.tipoEvento,
                    evento.descricao
                ],
                function (err) {
                    if (err) { console.log(err) 
                        return reject('Não foi possível adicionar o evento do db!')
                    }
                    return resolve()
                }
            )
        })
    }

    buscaTodos(id) {
        return new Promise((resolve, reject) => {
                this._db.all(
                    `
                        SELECT *
                        FROM eventos
                        WHERE usuario_id = ?
                    `,
                    [id]
                    ,
                    (erro, eventos) => {
                        if (erro) {
                            return reject('houve algum problema!');
                        }
                        return resolve(eventos);
                    }
                )
            });
    }


    atualiza(evento, idUsuario) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE eventos SET
                evento = ?,
                data = ?,
                hora = ?,
                local = ?,
                tipo = ?,
                observacoes = ?
                WHERE id = ?
                AND usuario_id = ?
                
            `,
            [
                evento.evento,
                evento.dataEvento,
                evento.horaEvento,
                evento.localEvento,
                evento.tipoEvento,
                evento.descricao,
                evento.idEvento,
                idUsuario
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o evento!');
                }

                resolve();
            });
        });
    }

    remove(idEvento, id) {

        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    DELETE 
                    FROM eventos
                    WHERE id = ?
                    AND usuario_id = ?

                `,
                [
                    idEvento,
                    id
                ],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o evento!');
                    }
                    return resolve();
                }
            );
        });
    }
    

}

module.exports = EventoDao;