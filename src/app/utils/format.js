
const tiposDeEvento = [
    {valor: "saude", texto: "Cuidados com a Saúde"},
    {valor: "trabalho", texto: "Compromissos profissionais"},
    {valor: "estudo", texto: "Compromissos estudantis"},
    {valor: "boleto", texto: "Pagamentos e Boletos"},
    {valor: "lazer", texto: "Passeios e lazer"},
    {valor: "viagem", texto: "Viagens!"}   
];

function displayDataHorario(eventos) {
    eventos = eventos.sort((a, b) => new Date(a.data) - new Date(b.data))
    eventos = eventos.map(evento => {
        const datas = evento.data.split('-');
        const horas = evento.hora.split(':');

        const novaData = new Date(datas[0], datas[1], datas[2], horas[0], horas[1])
        
        const semana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

        if(novaData - new Date() < 0 ) {
            evento.data = `${semana[novaData.getDay()]}, ${novaData.getDate()}/${novaData.getMonth()+1}/${novaData.getUTCFullYear()} à(s) ${novaData.getHours()} e ${novaData.getMinutes()} *`;
        }
        else {
            evento.data = `${semana[novaData.getDay()]}, ${novaData.getDate()}/${novaData.getMonth()+1}/${novaData.getUTCFullYear()} à(s) ${novaData.getHours()} e ${novaData.getMinutes()}`;
        }
            
        return evento
    })
    return eventos
}

module.exports = {
    tiposDeEvento,
    displayDataHorario
}