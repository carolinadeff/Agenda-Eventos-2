
document.querySelector('#botaoOcultaForm').onclick = escondeForm
document.querySelector('.botaoExibeForm').onclick = exibeForm

function escondeForm(event){
    event.preventDefault();
    document.querySelector("#conteudo-todo-form").classList.add("invisivel");
}

function exibeForm(){
    document.querySelector("#conteudo-todo-form").classList.remove("invisivel");
}
