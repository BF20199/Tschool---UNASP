# TSchool,

TSchool é um sistema responsável por organizar, agendar, notificar e servir de ponte para autorizações de saídas pedagógicas, utilizando um proposta simples: Permitir que uma escola possa notificar os responsáveis das saídas e permitir que os responsáveis tenham todas as informações necessárias para autorizar. 

![10188814-4921-4389-b117-4a45a940681a](https://user-images.githubusercontent.com/34111297/70008042-32616780-1551-11ea-8665-d0d07f5e03fa.jpg)

O objetivo principal é facilitar as saídas escolares, visando facilitar a comunicação entre escola e responsável, de modo a sanar as dificuldades vividas pelos dois lados.

Nosso time é composto por 4 pessoas, cada um possui skills específicas, porém todos têm algo em comum: Facilitar e transformar através do uso da tecnologia a experiência e comodidade de todos em sua volta.

Equipe (nosso time, demaisss!):
. `Bruno Feitosa` (dev) <https://www.linkedin.com/in/bruno-feitosa-84a88a150/>
. `Felipe Melo` (po) <https://www.linkedin.com/>
. `Felipe Pinheiro` (dev) <https://www.linkedin.com/in/felipepinheirodantas/>
. `Matheus Lucena` (po) <https://www.linkedin.com/in/matheus-lucena-a75b86145/>


#### REQUISITOS FUNCIONAIS

| requisito | descrição |
| ------------ | ------------ |
|  [RF01] Cadastro da aluno | O sistema deve permitir que a escola cadastre novos alunos no evento. |
|  [RF02] Manutenção de cadastro | O sistema deve manter cadastro de todos os alunos participantes dos eventos, para consulta futura.|
| [RF03] Status de alunos confirmados |  O sistema deve permitir que a escola altere o status dos alunos já confirmados. |
|  [RF04] Informações dos eventos |  O sistema deve permitir que a escola poste informações sobre os eventos que vão ser realizados. |
|   [RF05] Receber notificação de evento | O sistema deve permitir que o usuário(pai), receba uma notificação sobre um novo evento que o filho possa participar. |
|   [RF06] Receber confirmação de evento | O sistema deve emitir uma notificação para o pai, confirmando a presença do filho no evento. |
|  [RF07] Autorização do evento | O sistema deve permitir que o usuário(pai), autorize o filho a participar do evento através de um termo de consentimento. |
|  [RF08] Portabilidade do sistema | O sistema deve ter portabilidade móvel para o controle dos pais de qualquer lugar. |
|  [RF09] Pagamentos | O sistema deve ter suporte para pagamentos online dos eventos, através de cartões. |
|  [RF010] Confirmação de presença | O sistema deve permitir que a escola confirme a presença e a saída do filho do evento. |


![tschool_usecase](https://user-images.githubusercontent.com/2241850/111889073-e98d2680-89c0-11eb-963f-e43949f39363.png)
> Use Case 


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



#### PROJETO E TECNOLOGIA ENVOLVIDA

##### Frontend/web
- Javascript 
- HTML/HTML5
- CSS3

##### Backend
- Nodejs
- Cors
- Express
- Knex

##### Repositório de dados
- Sqlite3

##### Testes, PoC's e entidades
- Java SDK

As principais entidades do sistema estão no diagrama de classe (UML) abaixo, incluindo também seus relacionamentos de colaboração e de generalização.

![tschool_modelo_banco](https://user-images.githubusercontent.com/2241850/111889081-fd388d00-89c0-11eb-8b8a-f90c68fc9725.png)
> Diagrama de classe para as principais entidades do sistema

Abaixo os diagramas de banco de dados. As principais entidades do sistema segundo as apresentações no modelo lógico e físico.

![tschool_modelo_banco_dados](https://user-images.githubusercontent.com/2241850/111889087-045f9b00-89c1-11eb-9e55-efa736404e63.jpg)
> Modelo entidade relacionamento


#### RESULTADOS

Abaixo uma sequência de imagens que mostram o protótipo desenvolvido. 

Na primeira sequência, o módulo móvel, interface exclusiva para os usuários responsáveis no sistema, ou seja, os pais/responsáveis dos alunos, participantes de eventos.

Através desse módulo os usuários responsáveis de alunos podem ser informados de eventos planejados pela escola, e consecutivamente confirmar ou rejeitar a participação de seus respectivos no passeio (saída pedagógica).

![Tela-Inicial-Login](https://user-images.githubusercontent.com/34111297/70012793-4d81a680-1554-11ea-96a8-2e1c3ab38b43.jpg)      ![Login](https://user-images.githubusercontent.com/34111297/70012956-cb45b200-1554-11ea-9982-265d87d03118.png)
> Tela mobile de apresentação e de login

Agora uma sequência de imagens demonstrando algumas telas do sistema no módulo web. 

Entre as principais características estão a preocupação com uso de cores, posicionamento das imagens e facilidade de uso através de componentes baseados em cards, type fonte bem apresentáveis e estética, como um todo, adequada ao contexto do sistema.

![TSCHOOL_WEB_TELALOGIN](https://user-images.githubusercontent.com/2241850/111889093-0fb2c680-89c1-11eb-9c52-908b9127dd91.png)
> Tela de acesso do sistema

Tela de gestão dos eventos. Nela o administrador pode controlar todos os eventos do sistema. Algumas operações são baseadas e limitadas por algumas regras de negócio, por exemplo  um evento não pode ser cancelado muito próximo ao início do evento.

![TSCHOOL_WEB_EVENTOS](https://user-images.githubusercontent.com/2241850/111889101-1b9e8880-89c1-11eb-9757-c4a3e4bacdde.png)
> Tela de gestão e controle de eventos

Nesta tela o administrador do sistema possui uma visão detalhada do evento, por exemplo, tendo uma ideia da quantidade e quem são os participantes do evento, principalmente se inteirando do status de aceitação de cada participante.

![TSCHOOL_WEB_LISTA_PARTICIPANTES](https://user-images.githubusercontent.com/2241850/111889094-15101100-89c1-11eb-8f12-d153d8a87fca.png)
> Listagem de participantes de um evento

De acordo com alguns controles de negócio, o administrador pode remover ou cancelar um determinado evento. É uma evolução do sistema a inclusão de um sistema de notificação para os demais participantes "confirmados" de acordo com o cancelamento do evento.

![TSCHOOL_WEB_DELETAREVENTO](https://user-images.githubusercontent.com/2241850/111889098-18a39800-89c1-11eb-9e03-2ddc994c7c69.png)
> Removendo ou cancelando um evento do sistema



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

. <https://trello.com/b/m7TEyWMi/pi-unasp>
. <https://www.figma.com/file/FkvgqeY9CFyTPMaG1kR10O/Login?node-id=0%3A1>
. <https://www.figma.com/file/FkvgqeY9CFyTPMaG1kR10O/TSchool?node-id=186%3A2>
. <https://github.com/BF20199/Tschool---UNASP>

> TSchool, é show!



