const connection = require('../database/connection');
module.exports = {
    async index(req, res){
        const id_school = req.headers.authorization;

        const classes = await connection('class').where('id_school', id_school).select('*').orderBy('nameclass');

        return res.json(classes);
    },

    async classbyid(request, response){
        const id_class = request.params;

        const classe = await connection('class').where(id_class).select('*');

        return response.json(classe);
    },

    async create(req, res){
        const { nameclass,  num_students, period} = req.body;

        const id_school = req.headers.authorization;

        //checar se classe já existe
        const classExist = await connection('class').select('id_class').where('nameclass', nameclass).first();

        if (classExist) {
            return res.status(401).json({error: 'Class already exist'});
        }

        //bd sqlite
        // const [id] = await connection('class').insert({
        //bd postgress
        await connection('class').insert({
            nameclass,
            //num_students,
            period,
            id_school
        });

        //Pegar id da classe criada por causa do postgres que não retorna
        const id = await connection('class').select('id_class').where('nameclass', nameclass).first();

        return res.json(id);
    },

    async delete(req, res){
        const {class_id} = req.params;
        const id_school = req.headers.authorization;

        const clas = await connection('class')
        .where('id_class', class_id)
        .select('class.*')
        .first();

        if(!clas){
            return res.status(401).json({error: 'Class not found'});
        }
        if(clas.id_school != id_school){

            return res.status(401).json({error: 'Operation not permitted'});
        }
        await connection('class').where('id_class', class_id).delete();

        return res.status(204).send();
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