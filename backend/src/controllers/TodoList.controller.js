const db = require('../db');
const { query } = require('express');

module.exports = {
    async index(req, res) {
        try {
            const results = await db.query(
                'SELECT * FROM todolists ORDER BY id'
            );

            res.status(200).json({
                todolists: results.rows
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    },

    async store(req, res) {
        let { title } = req.body;

        if (!title) {
            return res.status(400).json('Envie um título válido no próximo request');
        }

        try {
            const results = await db.query(
                'INSERT INTO todolists (title) VALUES ($1) RETURNING *',
                [title]
            );
    
            res.status(200).json({
                todolist: results.rows[0]
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    },

    async show(req, res) {
        let { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json("Envie um id válido no próximo request!");
        }

        try {
            const todoResults = await db.query(
                'SELECT * FROM todolists WHERE id = ($1)',
                [id]
            );
            
            if (!todoResults.rowCount) {
                return res.status(400).json(`To-do list de id ${id} não existe`);
            }

            const taskResults = await db.query(
                'SELECT * FROM tasks WHERE todolist_id = ($1) ORDER BY id',
                [id]
            );

            return res.status(200).json({
                todoTitle: todoResults.rows[0].title,
                tasks: taskResults.rows
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    },

    async update(req, res) {
        let { id } = req.params;
        let { title } = req.body;

        if (isNaN(id)) {
            return res.status(400).json("Envie um id válido no próximo request!");
        }

        if (!title) {
            return res.status(400).json('Envie um título válido no próximo request');
        }

        try {
            const results = await db.query(
                'UPDATE todolists SET title = ($1) WHERE id = ($2) RETURNING *',
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
    },

    async delete(req, res) {
        try {
            let { id } = req.params;

            if (isNaN(id)) {
                return res.status(400).json("Envie um id válido no próximo request!");
            }

            const result = await db.query(
                'DELETE FROM todolists WHERE id = ($1) RETURNING *',
                [id]
            );

            if (!result.rowCount) {
                return res.status(400).json(`To-do list de id ${id} não existe`);
            }

            return res.status(200).json({
                todolist: result.rows[0]
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    }
}