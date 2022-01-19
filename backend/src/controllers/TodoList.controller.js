const db = require('../db');
const { query } = require('express');

module.exports = {
    async index(req, res) {
        try {
            const results = await db.query(
                'SELECT * FROM todolists'
            );

            res.status(200).json({
                todolists: results.rows
            })
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
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json("Falha interna do servidor");
        }
    }
}