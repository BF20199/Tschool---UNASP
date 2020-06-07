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

        //checar se responsável já existe
        const resCpfExist = await connection('responsibles').select('id_res').where('cpf', cpf).first();
        const resEmailExist = await connection('responsibles').select('id_res').where('email', email).first();

        if (resCpfExist) {
            return res.status(401).json({error: 'Cpf already exist'});
        } else if (resEmailExist) { return res.status(401).json({error: 'Email already exist'}); }

        //bd sqlite
        // const [id] = await connection('responsibles').insert({
        //bd postgress
        await connection('responsibles').insert({
            cpf,
            name_res,
            zip_code,
            email,
            password
        });

        //Pegar id da classe criada por causa do postgres que não retorna
        const id = await connection('responsibles').select('id_res').where('cpf', cpf).first();

        return res.json(id);
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