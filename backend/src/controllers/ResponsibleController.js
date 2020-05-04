const connection = require('../database/connection');
module.exports = {
    async index(req, res){
        const resp = await connection('responsibles').select('*');

        return res.json(resp);
    },

    async responsiblebyid(request, response){
        const { id_res } = request.params;

        const reponsible = await connection('responsibles')
            .where('id_res', id_res)
            .select('*');

        return response.json(reponsible);
    },

    async create(req, res){
        
        const { cpf, name_res, zip_code, email, password } = req.body;

        //const id_school = req.headers.authorization;
        
        const [id] = await connection('responsibles').insert({
            cpf,
            name_res,
            zip_code,email,
            password        
        });

        return res.json({id})
    },

    async delete(req, res){
        const { id_res } = req.params;

        const responsible = await connection('responsibles')
        .where('id_res', id_res)
        .select('responsibles.*')
        .first();

        if(!responsible){
            return res.status(401).json({error: 'Responsible not found'});
        }

        await connection('responsibles').where('id_res', id_res).delete();

        return res.status(204).send();
    },

    async update(req, res){
        const { id_res } = req.params;
        const { cpf, name_res, zip_code, email, password } = req.body;

        await connection('responsibles').where('id_res', id_res).update({
            cpf, 
            name_res, 
            zip_code, 
            email, 
            password
        });

        return res.json(id_res);
    }

};