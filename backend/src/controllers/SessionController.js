const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const { email, password } = req.body;

        const schools = await connection('schools')
        .where('email', email).andWhere('password', password)
        .select('nameschool', 'id')
        .first();

        if(!schools){
            return res.status(400).json({erro: 'E-mail ou senha incorreto'})
        }
        
        return res.json(schools);
    },

    async singInApp(req, res){
        const { email, password } = req.body;

        const responsibles = await connection('responsibles')
        .where('email', email).andWhere('password', password)
        .select('name_res', 'id_res')
        .first();

        if(!responsibles){
            return res.status(400).json({erro: 'E-mail ou senha incorreto'})
        }
        
        return res.json(responsibles);
    }
}