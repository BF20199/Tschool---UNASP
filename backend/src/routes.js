const express = require('express');
const routes = express.Router();

const SchoolController = require('./controllers/SchoolController');
const SessionController = require('./controllers/SessionController');
const ClassController = require('./controllers/ClassController');
const ResponsibleController = require('./controllers/ResponsibleController');
const StudentController = require('./controllers/StudentController');
const EventController = require('./controllers/EventController');
const EventClassController = require('./controllers/EventClassController');
const ParticipantsController = require('./controllers/ParticipantsController');

//Rotas Escolas
routes.get('/schools', SchoolController.index);
routes.post('/schools', SchoolController.create);
routes.delete('/schools/:id', SchoolController.delete);

//Rota de Login Web
routes.post('/sessions', SessionController.create);

//Rota de Login Mobile
routes.post('/signin', SessionController.singInApp);

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
routes.get('/studentsbyres',  StudentController.studentsbyresponsible);
routes.post('/student', StudentController.create);
routes.delete('/student/:id', StudentController.delete);
routes.put('/student/:id', StudentController.update);

//Rotas Eventos
routes.get('/event',  EventController.index);
routes.get('/event/:id_event',  EventController.eventbyid);
routes.post('/event', EventController.create);
routes.delete('/event/:id_event', EventController.delete);
routes.put('/event/:id_event', EventController.update);
routes.get('/eventres', EventClassController.eventbystundet);

//Rotas Event-class
routes.get('/eventclass',  EventClassController.index);
routes.post('/eventclass', EventClassController.create);
routes.delete('/eventclass/:id', EventClassController.delete);

//Rotas Participants
routes.get('/participants',  ParticipantsController.index);
routes.get('/participants/:id_class',  ParticipantsController.listparticipantsbyclass);
routes.post('/participants', ParticipantsController.create);
routes.put('/participants/:id_event', ParticipantsController.update);

module.exports = routes;