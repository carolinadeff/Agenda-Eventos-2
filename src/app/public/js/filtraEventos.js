const sessaoFiltros = document.querySelector('.sessao-filtrar');
const filtros = sessaoFiltros.querySelectorAll('.filtro')

filtros.forEach(filtro => {
    filtro.addEventListener('change', listaSelecionados)
})

function listaSelecionados() {
    
    const listaTipos = [];
    filtros.forEach(filtro => {
        if (filtro.checked) {
            listaTipos.push(filtro.value)
        }
    })

    const tabelaEventos = document.querySelector('.conteudo-tabela');
    const itensTabela = tabelaEventos.querySelectorAll('TR')
    itensTabela.forEach(itemTabela => {
        if (!listaTipos.includes(itemTabela.classList[0]))
            itemTabela.classList.add('linhaInvisivel')
        else 
            itemTabela.classList.remove('linhaInvisivel')
        })
           
    if (listaTipos.length == 0) {
        itensTabela.forEach(itemTabela => itemTabela.classList.remove('linhaInvisivel'))
    }
        

}   