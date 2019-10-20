const express = require('express');
const routes = express.Router();
const SessionController = require('./controllers/SessionController');
routes.use(express.json());


//GET (Buscar), PUT(Editar), POST(Criar), DELETE(Deletar)
//req.query = Acessar query params (Filtros)
//req.params = Acessar rout params (Edição e delete
//req.Body = Acessar corpo da requisição (Criação, edição)
routes.post('/session', SessionController.store);

module.exports = routes;