const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    return res.status(500).json("Funcionando");
})

module.exports = router;