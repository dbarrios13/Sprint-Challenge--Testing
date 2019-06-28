const express = require('express')

const server = express()

const Games = require('./games-model')

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the server'
    })  
})

server.get('/games', async(req, res) => {
    try {
        const games = await Games.get()
        res.status(200).json({
            games,
            message: 'Successful'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving games'
        })
    }
})

server.post('/games', async(req, res) => {
    try {
        const game = await Games.add(req.body)
        if(game.title && game.genre) {
            res.status(201).json(game)            
        } else {
            res.status(422).json({
                message:'Please provide title and genre of the game'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error adding game'
        })
    }
})



module.exports = server