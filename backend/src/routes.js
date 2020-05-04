const express = require('express');
const routes = express.Router();

const SchoolController = require('./controllers/SchoolController')
const SessionController = require('./controllers/SessionController')
const ClassController = require('./controllers/ClassController')
const ResponsibleController = require('./controllers/ResponsibleController')
const StudentController = require('./controllers/StudentController')
const EventController = require('./controllers/EventController')

//Rotas Escolas
routes.get('/schools', SchoolController.index);
routes.post('/schools', SchoolController.create);
routes.delete('/schools/:id', SchoolController.delete);

//Rota de Login
routes.post('/sessions', SessionController.create);

//Rotas Classes
routes.get('/class',  ClassController.index);
routes.get('/class/:id_class',  ClassController.classbyid);
routes.post('/class', ClassController.create);
routes.delete('/class/:class_id', ClassController.delete);
routes.put('/class/:id_class', ClassController.update);

//Rotas Responsáveis
routes.get('/responsible',  ResponsibleController.index);
routes.get('/responsible/:id_res', ResponsibleController.responsiblebyid);
routes.post('/responsible', ResponsibleController.create);
routes.delete('/responsible/:id_res', ResponsibleController.delete);
routes.put('/responsible/:id_res', ResponsibleController.update);

//Rotas Alunos
routes.get('/studentss',  StudentController.index);
routes.get('/student/:id_class',  StudentController.studentsbyclass);
routes.get('/students',  StudentController.studentsbyschool);
routes.get('/studentsbyid/:id',  StudentController.studentbyid);
routes.post('/student', StudentController.create);
routes.delete('/student/:id', StudentController.delete);
routes.put('/student/:id', StudentController.update);

//Rotas Eventos
routes.get('/event',  EventController.index);
routes.get('/event/:id_event',  EventController.eventbyid);
routes.post('/event', EventController.create);
routes.delete('/event/:id', EventController.delete);
routes.put('/event/:id_event', EventController.update);



module.exports = routes;