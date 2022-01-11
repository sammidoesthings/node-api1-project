// BUILD YOUR SERVER HERE
//IMPORT SERVER
const express = require('express')

//IMPORT MODELS
const USERS = require('./users/model')

//EXPRESS SERVER
const server = express()
//MIDDLEWARE
server.use(express.json())

//ENDPOINTS

//HELLO WORLD

// | GET | /hello         | console.log "hello, web 49!"
server.get('/hello', (req, res) =>{
    res.status(200).json('hello, web 49!')
})

// | POST | /api/users     | Creates a user using the information sent inside the `request body`
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    const newUser = USERS.insert({ name, bio })
        .then (newUser => {
            if (!name || !bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else {
                res.status(201).json(newUser)
            }
        })
        .catch (err => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
})

// | GET  | /api/users     | Returns an array users
server.get('/api/users', (req, res) => {
   USERS.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
})

// | GET  | /api/users/:id | Returns the user object with the specified `id`

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const specificUser = USERS.findById(id)
    .then (specificUser => {
        if (!specificUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(specificUser)
        }
    })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})


// |DELETE| /api/users/:id | Removes the user with the specified `id` and returns the deleted user

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const deletedUser = USERS.remove(id)
    .then (deletedUser => {
        if (!deletedUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(deletedUser)
        }
    })
        .catch(err => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})


// | PUT  | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body
    const updatedUser = USERS.update(id, { name, bio })
    .then (updatedUser => {
        if (!updatedUser) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else if (!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user"})
        } else {
            res.json(updatedUser)
        }
    })
        .catch(err => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

//EXPORTS
module.exports = server