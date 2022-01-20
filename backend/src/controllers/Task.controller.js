const db = require('../db');
const { query } = require('express');

module.exports = {
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

            res.status(200).json({
                task: results.rows[0]
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    },

    async delete(req, res) {
        try {
            let { id } = req.params;

            const result = await db.query(
                'DELETE FROM tasks WHERE id = ($1)',
                [id]
            );

            if (!result.rowCount) {
                return res.status(400).json(`Task de id ${id} não existe`);
            }

            return res.status(200).json();
        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    },

    async updateStatus(req, res) {
        try {
            let { id } = req.params;

            const results = await db.query(
                'UPDATE tasks SET completed = NOT completed WHERE id = ($1) RETURNING *',
                [id]
            );

            if (!results.rowCount) {
                return res.status(204).json();
            }

            return res.status(200).json({
                task: results.rows[0]
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    },

    async updateTitle(req, res) {
        let { id } = req.params;
        let { title } = req.body;

        if (!title) {
            return res.status(400).json('Envie um título válido no próximo request');
        }

        try {
            const results = await db.query(
                'UPDATE tasks SET title = ($1) WHERE id = ($2) RETURNING *',
                [title, id]
            )

            if (!results.rowCount) {
                return res.status(204).json();
            }

            return res.status(200).json({
                todolist: results.rows[0]
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    }
}