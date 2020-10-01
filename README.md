# Agenda-Eventos-2
Agenda enxuta para gerenciar eventos!

https://cryptic-brushlands-93366.herokuapp.com/

Essa aplicação foi um projetinho meu, para exercita conceitos e ferramentas aprendidos nos cursos da Alura da formação de Note, e de front-end.
É uma agenda para salvar e vizualizar eventos e lembretes, divididos em categorias estáticas (ponto a melhorar, o usuário deve poder criar suas categorias). Cada categoria tem um layout e os eventos podem ser filtrados por categoria. Eventos novos são criados na aba lateral esquerda e cada evento pode ser deletado ou editado. No front-end usei html, css puros para criar os layouts, e javascript quase puro, com o nunjucks, para renderizar os dados e alternar entre as views.
No back-end usei o Express para criar o servidor e as rotas e o passport junto para fazer autenticação. para persistir eventos e usuários, mysql.
A entrada da aplicação tem a opção de criar o usuario ou fazer login.

[inicio](./inicial.png)

Ao realizar login o usuário é direciopnado à agenda, onde cria, edita e visualiza os eventos, com filtros de categoria e de visualização de eventos passados.

[agenda](https://github.com/carolinadeff/Agenda-Eventos-2/blob/master/agenda.png)
[agenda](https://github.com/carolinadeff/Agenda-Eventos-2/blob/master/agenda2.png)

