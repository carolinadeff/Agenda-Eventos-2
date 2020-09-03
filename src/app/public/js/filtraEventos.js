
const filtros = document.querySelectorAll('.filtro');
const filtroPassados = document.querySelector('.filtro-passados');

const tabelaEventos = document.querySelector('.conteudo-tabela');
const itensTabela = tabelaEventos.querySelectorAll('TR');

itensTabela.forEach(itemTabela => {
    var data = itemTabela.querySelector('.celula-data');
    if(/p/g.test(data.textContent)) {
        itemTabela.classList.add('evento-passado')
        data.textContent = (data.textContent.split('('))[0];
    }      
})

//oculta eventos passados no carregamento da página

function ocultaEventosPassados() {
    if(!filtroPassados.checked) {
        itensTabela.forEach(itemTabela => {
            if(itemTabela.classList[1] == 'evento-passado') itemTabela.classList.add('linhaInvisivel')  
        })
    }
}
// rodar no carregamento da página
ocultaEventosPassados()


// ouvidor de eventos em cada filtro e no de tempo
filtros.forEach(filtro => {
    filtro.addEventListener('change', listaSelecionados)
})

filtroPassados.addEventListener('change', listaSelecionados)


function listaSelecionados() {
    
    const listaTipos = [];
    filtros.forEach(filtro => {
        if (filtro.checked) {
            listaTipos.push(filtro.value)
        }
    })

    itensTabela.forEach(itemTabela => {
        if (!listaTipos.includes(itemTabela.classList[0]))
            itemTabela.classList.add('linhaInvisivel')
        else 
            itemTabela.classList.remove('linhaInvisivel')
        })
        
    if (listaTipos.length == 0) {
        itensTabela.forEach(itemTabela => itemTabela.classList.remove('linhaInvisivel'))    
    }

    ocultaEventosPassados()    
}
