# TSchool,

TSchool é um sistema responsavél por organizar, agendar, notificar e servir de ponte para autorizações de saídas pedagogicas, utilizando um proposta simples: Permitir que uma escola possa notificar os responsaveis das saídas e permitir que os responsavéis tenham todas as informações necessarias para autorizar. 

![10188814-4921-4389-b117-4a45a940681a](https://user-images.githubusercontent.com/34111297/70008042-32616780-1551-11ea-8665-d0d07f5e03fa.jpg)

O objetivo principal é facilitar as saídas escolares, visando facilitar a comunicação entre escola e responsavél, de modo a sanar as dificuldades vividas pelos dois lados.

Nossto time é composto por 4 pessoas, cada um possui skills especificas, porém todos tem algo em comum: Facilitar e transformar através do uso da tecnologia a experiência e comodidade de todos em sua volta.

Time:
- Bruno Feitosa (business e dev)
- Felipe Melo (business e dev)
- Felipe Pinheiro (dev)
- Matheus Lucena (business)



#### REQUISITOS FUNCIONAIS

| requisito | descrição |
| ------------ | ------------ |
|  [RF01] Cadastro da aluno | O sistema deve permitir que a escola cadastre novos alunos no evento. |
|  [RF02] Manutenção de cadastro | O sistema deve manter cadastro de todos os alunos participantes dos eventos, para consulta futura.|
| [RF03] Status de alunos confirmados |  O sistema deve permitir que a escola altere o status dos alunos já confirmados. |
|  [RF04] Informações dos eventos |  O sistema deve permitir que a escola poste informações sobre os eventos que vão ser realizados. |
|   [RF05] Receber notificação de evento | O sistema deve permitir que o usuário(pai), receba uma notificação sobre um novo evento que o filho possa participar. |
|   [RF06] Receber confirmação de evento | O sistema deve emitir uma notificação para o pai, confirmando a presença do filho no evento. |
|  [RF07] Autorização do evento | O sistema deve permitir que o usuário(pai), autorize o filho a participar do evento através de um termo de consentimento. |
|  [RF08] Portabilidade do sistema | O sistema deve ter portabilidade móvel para o controle dos pais de qualquer lugar. |
|  [RF09] Pagamentos | O sistema deve ter suporte para pagamentos online dos eventos, através de cartões. |
|  [RF010] Confirmação de presença | O sistema deve permitir que a escola confirme a presença e a saída do filho do evento. |




#### REQUISITOS NAO FUNCIONAIS


- [RNF01] Inclusão de Banco de Dados relacional 

- [RN02] Tempo de resposta
	[Tempo de resposta para cada “click” deverá ser realizado no máximo em 0.05sec.]

- [RN03] Matrículas dos pais aos dados da escola
	[Cadastro dos pais deverá estar linkado ao sistema de matrículas da escola]

- [RN04] Notificações
	[As notificações só serão descartadas após o envio de resposta. Sucedendo o envio de resposta o sistema deve notificar a resposta para a escola]

- [RN05] Ambiente de programação
	[O sistema deverá ser programado em java.]

- [RN06] Padrão para ambiente de programação
	[No ambiente de programação, o projeto deverá ser realizado no padrão MVC.]

- [RN07] Acesso escola
	[A escola deverá ter acesso somente ao envio de resposta]

- [RN08] Erro senha
	[Se o usuário errar a senha mais de três vezes, enviar um token de confirmação para o e-mail do mesmo.]

- [RN09] Manutenção do sistema
	[Fazer manutenções semanais no sistema (bugs, backups, etc.), no período da madrugada, caso o sistema venha a ficar indisponível (queda de servidor, etc.), uma mensagem deverá ser emitida.]

- [RN10] Tamanho do sistema para implementação de app
	[Tamanho máximo do sistema pra app é de no máximo 100MB.]


#### TECNOLOGIA

##### Frontend/web
- Javascript 
- HTML/HTML5
- CSS3

##### Backend
- Nodejs
- Cors
- Express
- Knex
- pg

##### Repositorio de dados
- Sqlite3

##### Testes, PoC's e entidades
- Java SDK




#### RESULTADOS

![Tela-Inicial-Login](https://user-images.githubusercontent.com/34111297/70012793-4d81a680-1554-11ea-96a8-2e1c3ab38b43.jpg)      ![Login](https://user-images.githubusercontent.com/34111297/70012956-cb45b200-1554-11ea-9982-265d87d03118.png)


#### INSTALAÇÃO

###### script para estrutura de banco

```java
create table classes(
	id_classe integer,
	numero_alunos integer,
	periodo nvarchar(20),
	primary key(id_classe) 
);

create table escola(
	id_escola integer,
	nome_escola nvarchar(50),
	cep nvarchar(20),
	numero_alunos integer,
	id_classe integer,
	foreign key(id_classe) references classes(id_classe)
);

create table evento(
	id_evento integer,
	danielpatronum8_evento date,
	horario_evento time,
	local_evento nvarchar(30),
	primary key(id_evento)
);

create table aluno(
	ra_aluno integer,
	nome_aluno nvarchar(30),
	idade integer,
	primary key(ra_aluno)
);

create table participantes(
	ra_aluno integer,
	id_classe integer,
	foreign key(ra_aluno) references aluno(ra_aluno),
	foreign key(id_classe) references classes(id_classe)
);

create table responsaveis(
	id_responsavel integer,
	cpf integer,
	nome_responsavel nvarchar(40),
	cep nvarchar(20),
	primary key(id_responsavel)
);

create table possui(
	id_responsavel integer,
	ra_aluno integer,
	foreign key(id_responsavel) references responsaveis(id_responsavel),
	foreign key(ra_aluno) references aluno(ra_aluno)
);

```

#### REFERÊNCIAS, mais informações

###### planilha de controle de projeto: 
`<trello>` : <https://trello.com/b/m7TEyWMi/pi-unasp>

###### projeto de Interface:
`<modile>` : <https://www.figma.com/file/FkvgqeY9CFyTPMaG1kR10O/Login?node-id=0%3A1>

`<web>` : <https://www.figma.com/file/FkvgqeY9CFyTPMaG1kR10O/TSchool?node-id=186%3A2>

###### repositório

`<github>` : <https://github.com/BF20199/Tschool---UNASP>



> TSchool, é demaisss! 

