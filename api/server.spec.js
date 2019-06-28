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
    })
    describe('POST /games', () => {
        const game = {
                title: 'mortal kombat',
                genre: 'fighting'
        }

        it('return with 201 status', async() => {
            await supertest(server)
                .post('/games')
                .send(game)
                .expect(201)
        })
        it('return a JSON object', async() =>{
            await supertest(server)
                .post('/games')
                .expect('Content-Type', /json/i)
        })
        it('missing game data', async() => {
            await supertest(server)
                .post('/games')
                .send(game)
                .then(res => {
                    if(res.body.title && res.body.genre) {
                        return expect(201)
                    } else {
                        return expect(422)
                    }
                })
        })
    })
})