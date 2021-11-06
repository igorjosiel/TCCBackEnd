const request = require('supertest');
const express = require('express');
const studentsRouter = require('../route/studentsRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/students', studentsRouter);

describe('MySQL', () => {
    it('GET /students --> it brings every students', () => {
        return request(app)
            .get('/students')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body)
                .toEqual(expect.objectContaining({
                    data: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            email: expect.any(String),
                            ra: expect.any(String),
                            cpf: expect.any(String)
                        })
                    ]),
                    pagination: expect.objectContaining({
                        previousPage: expect.any(Number),
                        page: expect.any(Number),
                        nextPage: expect.any(Number),
                        totalResults: expect.any(Number)
                    }),
                    message: expect.any(String)
                }));
            });
    });

    it('GET /students/id --> it brings a specific student', () => {
        return request(app)
            .get('/students/4')
            .send({
                id: expect.any(Number)
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body)
                .toEqual(expect.objectContaining({
                    data: expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        email: expect.any(String),
                        ra: expect.any(String),
                        cpf: expect.any(String)
                    }),
                    message: expect.any(String)
                }));
            });
    });

    // it('GET /students/id --> 404 if not found', () => {
    //     return request(app)
    //         .get('/students/99999999')
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .then((response) => {
    //             expect(response.body)
    //             .toEqual(expect.objectContaining({
    //                 message: expect.any(String)
    //             }));
    //         });
    // });

    it('POST /students --> create a new student in the system', () => {
        return request(app)
            .post('/students')
            .send({
                name: expect.any(String),
                emaifddfdl: expect.any(String),
                ra: expect.any(String),
                cpf: expect.any(String)
            })
            .expect('Content-Type', /json/)
            // .expect(201)
            .then((response) => {
                expect(response.body)
                .toEqual(expect.objectContaining({
                    message: expect.any(String)
                }));
            });
    });

    it('DELETE /students/id --> delete one student in the system', () => {
        return request(app)
            .delete('/students/999')
            .send({
                id: expect.any(Number)
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body)
                .toEqual(expect.objectContaining({
                    message: expect.any(String)
                }));
            });
    });

    it('UPDATE /students/id --> update one student in the system', () => {
        return request(app)
            .put('/students/4')
            .send({
                name: expect.any(String),
                email: expect.any(String)
            })
            .expect('Content-Type', /json/)
            // .expect(200)
            .then((response) => {
                expect(response.body)
                .toEqual(expect.objectContaining({
                    message: expect.any(String)
                }));
            });
    });
});