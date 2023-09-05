import supertest from 'supertest';
import { createServer } from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const app = createServer();

describe('booksDirectory', () => {
    let id: string;
    let reqBody: any;

    beforeAll(async () => {
        id = '';

        reqBody = {
            "name": "The art of money",
            "author": "Michael",
            "year": 2010
        }

        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })

    describe('get booksDirectory route', () => {
        describe('given the book does not exist', () => {
            it('should return 404', async () => {
                const id = '64f57a700bfd12941978b5a4'
                const response = await supertest(app).get(`/booksDirectory/${id}`)
                expect(response.statusCode).toBe(404)
            })
        })

        describe('create a book in the directory', () => {
            it('should return 201', async () => {

                const response = await supertest(app).post('/booksDirectory')
                .send(reqBody)
                .set('Content-Type', 'application/json')

                id = response.body._id
                expect(response.statusCode).toBe(201)
            })
        })

        describe('given the book does exist', () => {
            it('should return 200', async () => {
                const response = await supertest(app).get(`/booksDirectory/${id}`)
                expect(response.statusCode).toBe(200);
            })
        })

        describe('get all books', () => {
            it('should return count as 1', async () => {
                const response = await supertest(app).get(`/booksDirectory`)
                expect(response.body.length).toBe(1);
                expect(response.body[0]._id).toBe(id);
            })
        })

        describe('update author of a book', () => {
            it('should return 201', async () => {
                const body = { "author": "Samir" }
                const response = await supertest(app)
                                        .patch(`/booksDirectory/${id}`)
                                        .send(body)
                                        .set('Content-Type', 'application/json')

                expect(response.statusCode).toBe(201);                       
                expect(response.body.author).toBe('Samir');
            })
        })

        describe('deleting a book that does not exist', () => {
            it('should return 404', async () => {
                const falseId = '64f57a700bfd12941978b5a4'
                const response = await supertest(app).delete(`/booksDirectory/${falseId}`);
                expect(response.statusCode).toBe(404);
            })
        })

        describe('deleting a book that does exist', () => {
            it('should return 200', async () => {
                const response = await supertest(app).delete(`/booksDirectory/${id}`);
                expect(response.statusCode).toBe(200);
            })
        })
    })
})