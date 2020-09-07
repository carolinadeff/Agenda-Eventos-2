document.querySelector('.conteudo-tabela').addEventListener('click', (e) => {
    if (e.target.nodeName == "TD") {
        const id = e.target.classList[0];
        const observacoes = document.querySelector('.observacoes');
        const obs = observacoes.querySelectorAll('p');
        obs.forEach(p => {
            if (p.classList[0] == id) p.classList.remove('invisivel')
            else p.classList.add('invisivel')
        })
    }
})

const quadrObs = document.querySelector('.lista-observacoes');

document.addEventListener("click", (e) => {
    if (e.target.nodeName == 'TR' || e.target.nodeName == 'TD') {
        quadrObs.classList.remove('lista-observacoes-visivel')
    } else {
        quadrObs.classList.add('lista-observacoes-visivel')
    }

})