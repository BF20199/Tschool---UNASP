const connection = require('../database/connection');
module.exports = {
    async index(req, res){
        const schools = await connection('schools').select('*');

        return res.json(schools);
    },
    async create(req, res){
        
    const { nameschool,  num_students, zip_code, email, phone, password} = req.body;

    const [id] = await connection('schools').insert({
        nameschool
        ,num_students
        ,zip_code
        ,email
        ,phone
        ,password
    });

    return res.json({id})
    },

    async delete(req, res){
        const {id} = req.params;
        const id_Schools = req.headers.authorization;

        const schools = await connection('schools')
        .where('id', id)
        .select('id')
        .first();
    
        if(schools.id != id_Schools){

            return res.status(401).json({error: 'Operation not permitted'});
        }
        await connection('schools').where('id', id).delete();

        return res.status(204).send();
    }
};