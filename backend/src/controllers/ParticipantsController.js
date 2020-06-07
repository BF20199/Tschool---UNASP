const connection = require('../database/connection');
module.exports = {
    async index(req, res){
        const id_school = req.headers.authorization;

        const eventClass = await connection('participants')
        .select('participants.id','events.title','students.name_student','class.nameclass', 'participants.authorization')
        .innerJoin('events', 'participants.id_event', 'events.id_event')
        .innerJoin('students', 'participants.id_student', 'students.id')
        .innerJoin('class', 'students.id_class', 'class.id_class')
        .where('events.id_school', id_school);

        return res.json(eventClass);
    },

    async listparticipantsbyclass(req, res){
        const id_school = req.headers.authorization;
        const { id_class } = req.params;

        const eventClass = await connection('participants')
        .select('events.title','students.name_student','class.nameclass', 'participants.authorization')
        .innerJoin('events', 'participants.id_event', 'events.id_event')
        .innerJoin('students', 'participants.id_student', 'students.id')
        .innerJoin('class', 'students.id_class', 'class.id_class')
        .where('events.id_school', id_school).andWhere('class.id_class', id_class);

        return res.json(eventClass);
    },

    //Rota somente utilizada pelo APP para autorizar participação do evento
    async create(req, res){
        const id_school = req.headers.authorization;
        const { id_event, id_student } = req.body;
        const authorization = 1;

        //checar se participant já existe
        const participantExist = await connection('participants').select('*')
        .where('id_event', id_event)
        .andWhere('id_student', id_student)
        .first();

        if (participantExist) {
            return res.status(401).json({error: 'Student already athorizated'});
        }

        //bd postgress
        await connection('participants').insert({
            id_student,
            id_event,
            authorization
        });

        return res.json({ id_event, id_student });
    },

    async update(req, res){
        const { id_class } = req.params;
        const {nameclass, period} = req.body;

        await connection('class').where('id_class', id_class).update({
            nameclass,
            period
        });

        return res.json();
    }
};