# Agenda-Eventos-2
Agenda enxuta para gerenciar eventos!

Acesse a aplicação:
https://cryptic-brushlands-93366.herokuapp.com/

A aplicação utiliza uma estrutura MVC simples, com back e front-end integrados; as views são enviadas pelas próprias rotas.
É uma agenda para salvar e vizualizar eventos e lembretes, divididos em categorias estáticas (ponto a melhorar, o usuário deve poder criar suas categorias). Cada categoria tem um layout e os eventos podem ser filtrados por categoria. Eventos novos são criados na aba lateral esquerda e cada evento pode ser deletado ou editado. No front-end utilizei html e css puros para criar os layouts, sem frameworks, como um exercício, e javascript com auxílio de um template engine, o nunjucks, para inserir os dados e alternar entre views.
Para construir o back-end, Express,  para criar o servidor e as rotas. A aplicação cria sessões para ser acessada. Na página inicial pode ser criado um usuário. Utilizei o módulo Passport para fazer autenticação, utilizando estratégia local. para persistir eventos e usuários, mysql.

![inicio](https://i.imgur.com/Nb9KyBw.png)

Ao realizar login o usuário é direciopnado à agenda, onde cria, edita e visualiza os eventos, com filtros de categoria e de visualização de eventos passados.

![agenda](https://i.imgur.com/B1yAPOm.png)
![agenda](https://i.imgur.com/aQPNVSV.png)

