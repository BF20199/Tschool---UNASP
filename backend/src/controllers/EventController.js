const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const id_school = request.headers.authorization;

        const events = await connection('events')
            .where('id_school', id_school)
            .select('*');

        return response.json(events);
    },

    async eventbyid(request, response){
        const id_school = request.headers.authorization;
        const id_event = request.params;

        const event = await connection('events')
            .where(id_event)
            .select('*');

        return response.json(event);
    },

    async create(req, res){
        const {title, endereco, description, value, date, hr_fin, hr_ini, observation} = req.body;
        const id_school = req.headers.authorization;

        //bd sqlite
        // const [id] = await connection('events').insert({
        //bd postgress
        await connection('events').insert({
            title,
            description,
            date,
            value,
            observation,
            hr_fin,
            hr_ini,
            endereco,
            id_school
        });

        return res.json();
    },

    async delete(req, res){
        const { id_event } = req.params;
        const id_school = req.headers.authorization;

        const event = await connection('events')
        .where('id_event', id_event)
        .select('id_school')
        .first();

        if(event.id_school != id_school){
            return res.status(401).json({error: 'Operation not permitted'});
        }

        //Deleta eventos por classes relacionados
        const eventClassExist = await connection('event-class')
        .where('id_event', id_event)
        .select('*');

        if(eventClassExist){
            await connection('event-class')
            .where('id_event', id_event)
            .delete();
        }
        
        await connection('events').where('id_event', id_event).delete();
        
        return res.status(204).send();
    },

    async update(req, res){
        const { id_event } = req.params;
        const {title, endereco, description, value, date, hr_fin, hr_ini, observation} = req.body;
        //const id_school = req.headers.authorization;

        await connection('events').where('id_event', id_event).update({
            title,
            description,
            date,
            value,
            observation,
            hr_fin,
            hr_ini,
            endereco
        });

        return res.json();
    }
};