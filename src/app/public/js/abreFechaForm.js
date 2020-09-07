
document.querySelector('#botao-oculta-form').onclick = escondeForm
document.querySelector('#botao-exibe-form').onclick = exibeForm

function escondeForm(event){
    event.preventDefault();
    document.querySelector("#conteudo-todo-form").classList.add("invisivel");
}

function exibeForm(){
    document.querySelector("#conteudo-todo-form").classList.remove("invisivel");
}
