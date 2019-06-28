const supertest = require('supertest')
const server = require('./server')

describe('server.js', () => {
    describe('GET /games', () => {
        it('return with 200 status', async () => {
            await supertest(server)
                .get('/games')
                .expect(200)
        })
        it('return a JSON object', async () => {
            await supertest(server)
                .get('/games')
                .expect('Content-Type', /json/i)
        })
        it('return message successful', async() => {
            await supertest(server)
                .get('/games')
                .then(res => [
                    expect(res.body.message).toEqual('Successful')
                ])
        })
        it('return an array if no games', async() => {
            await supertest(server)
                .get('/games')
                .then(res => {
                    // expect(res.body.games).toEqual([])
                })
        })
    })
    describe('POST /games', () => {
        const game = {
                title: 'mortal kombat',
                genre: 'fighting'
        }
        it('missing game data', async() => {
            await supertest(server)
                .post('/games')
                // .send(game)
                .expect(422)
        })
        it('return with 201 status', () => {
            return supertest(server)
                .post('/games')
                // .send(game)
                .expect(201)
        })
        it('return a JSON object', async() =>{
            await supertest(server)
                .post('/games')
                .expect('Content-Type', /json/i)
        })
    })
})