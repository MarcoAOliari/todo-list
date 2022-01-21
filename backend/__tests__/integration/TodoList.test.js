const request = require('supertest');
const app = require('../../src/app');

describe('GET /todolist', () => {
    it('deveria retornar todas as todo-lists', async () => {
        const response = await request(app)
            .get('/todolist');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('todolists');
    });
});

describe('POST /todolist', () => {
    it('deveria cadastrar um novo usuário', async () => {
        const response = await request(app)
            .post('/todolist')
            .send({
                title: 'title'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('todolist');
    });

    it('deveria retornar código 400', async () => {
        const response = await request(app)
            .post('/todolist')
            .send({
                title: undefined
            });
        
        expect(response.status).toBe(400);
    });
});

describe('GET /todolist/:id', () => {
    it('deveria retornar todas as tasks de uma to-do list', async () => {
        const response = await request(app)
            .get('/todolist/8'); //////////////////////

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('todoTitle');
        expect(response.body).toHaveProperty('tasks');
    });

    it('deveria retornar código 400', async () => {
        const response = await request(app)
            .get('/todolist/1000');

        expect(response.status).toBe(400);
    });
});

describe('PUT /todolist/:id', () => {
    it('deveria retornar a to-do list com título atualizado', async () => {
        const response = await request(app)
            .put('/todolist/10') ////////
            .send({
                title: 'teste'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('todolist');
    });

    it('deveria retornar código 204', async () => {
        const response = await request(app)
            .put('/todolist/1000')
            .send({
                title: 'teste'
            });
        
            expect(response.status).toBe(204);
    });

    it('deveria retornar código 400', async () => {
        const response = await request(app)
            .put('/todolist/1000')
            .send({
                title: undefined
            });
        
            expect(response.status).toBe(400);
    });
});

describe('DELETE /todolist/:id', () => {
    it('deveria retornar código 400 (id inexistente no banco)', async () => {
        const response = await request(app)
            .delete('/todolist/1000');

        expect(response.status).toBe(400);
    })
})