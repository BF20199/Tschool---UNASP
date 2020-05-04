const connection = require('../database/connection');
module.exports = {
    async index(req, res){
        const student = await connection('students').select('*');

        return res.json(student);
    },

    async studentsbyclass(req, res){
        const id_class = req.params;

        const student = await connection('students').where(id_class).select('*');

        return res.json(student);
    },

    async studentsbyschool(req, res){
        const id_school = req.headers.authorization;

        const students = await connection('students')
        .select('*').innerJoin('class', 'students.id_class', 'class.id_class')
        .innerJoin('responsibles', 'students.id_res', 'responsibles.id_res')
        .where('id_school', id_school).orderBy('name_student');

        // const students = await connection('students')
        // .select('*').innerJoin('class', 'students.id_class', 'class.id_class')
        // .where('id_school', id_school);
        
        return res.json(students);
    },

    async studentbyid(request, response){
        const id = request.params;

        const student = await connection('students').where(id).select('*')
        .innerJoin('responsibles','students.id_res', 'responsibles.id_res');

        return response.json(student);
    },

    async create(req, res){
        
        const { name_student,  idade } = req.body;

        const cpfres = req.headers.cpf;
        
        const id_class = req.headers.authclass;

        const { id_res } = await connection('responsibles')
        .where('cpf', cpfres)
        .select('id_res')
        .first();

        /*if (!id_res) {
            return res.status(401).json({error: 'Operation not permitted'});
        }*/

        const [id] = await connection('students').insert({
            name_student
            ,idade
            ,id_res
            ,id_class    
        });

        return res.json({id});
    },

    async delete(req, res){
        const { id } = req.params;

        await connection('students').where('id', id).delete();

        return res.status(204).send();
    },

    async update(req, res){
        const { id } = req.params;
        const cpfres = req.headers.cpf;
        const id_class = req.headers.authclass;
        const {name_student, idade} = req.body;

        const { id_res } = await connection('responsibles')
        .where('cpf', cpfres)
        .select('id_res')
        .first();

        await connection('students').where('id', id).update({
            name_student, 
            idade,
            id_res,
            id_class
        });

        return res.json();
    }

};