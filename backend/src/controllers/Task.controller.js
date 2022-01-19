const db = require('../db');
const { query } = require('express');

module.exports = {
    async index(req, res) {

    },

    async store(req, res) {
        let { id } = req.params;
        let { title } = req.body;

        if (!title) {
            return res.status(400).json('Envie um título válido no próximo request');
        }

        try {
            const results = await db.query(`
                INSERT INTO tasks (title, todolist_id) SELECT $1, $2
                WHERE EXISTS (SELECT *
                              FROM todolists
                              WHERE todolists.id = $2)
                RETURNING *
                `,
                [title, id]
            );
    
            if (!results.rowCount) {
                return res.status(400).json(`To-do list de id ${id} não existe`);
            }

            console.log(results)

            res.status(200).json({
                task: results.rows[0]
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    }
}