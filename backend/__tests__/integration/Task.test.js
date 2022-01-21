const request = require('supertest');
const app = require('../../src/app');

describe('POST /todolist/:id/task', () => {
    it('deveria cadastrar uma nova task em uma todo-list', async () => {
        const response = await request(app)
            .post('/todolist/8/task') /////////////
            .send({
                title: 'title'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('task');
    });

    it('deveria retornar código 400 (título inválido)', async () => {
        const response = await request(app)
        .post('/todolist/8/task') /////////////
        .send({
            title: undefined
        });

        expect(response.status).toBe(400);
    });

    it('deveria retornar código 400 (id não presente no banco)', async () => {
        const response = await request(app)
        .post('/todolist/1000/task') /////////////
        .send({
            title: 'title'
        });

        expect(response.status).toBe(400);
    });
});

describe('DELETE /task/:id', () => {
    it('deveria retornar código 400 (id inexistente no banco)', async () => {
        const response = await request(app)
            .delete('/task/1000');

        expect(response.status).toBe(400);
    });
});

describe('PUT /task/:id/status', () => {
    it('deveria retornar código 200', async () => {
        const response = await request(app)
            .put('/task/10/status') //////////////
            .send({
                title: 'title'
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('task');
    });

    it('deveria retornar código 204 (id inexistente no banco)', async () => {
        const response = await request(app)
            .put('/task/1000/status')
            .send({
                title: 'title'
            });
        
        expect(response.status).toBe(204);
    });
});

describe('PUT /task/:id/title', () => {
    it('deveria retornar a to-do list com título atualizado', async () => {
        const response = await request(app)
            .put('/task/10/title') ////////
            .send({
                title: 'teste'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('todolist'); ////////
    });

    it('deveria retornar código 204 (id não cadastrado no banco)', async () => {
        const response = await request(app)
            .put('/task/1000/title')
            .send({
                title: 'teste'
            });
        
            expect(response.status).toBe(204);
    });

    it('deveria retornar código 400 (título inválido)', async () => {
        const response = await request(app)
            .put('/todolist/1000')
            .send({
                title: undefined
            });
        
            expect(response.status).toBe(400);
    });
});
