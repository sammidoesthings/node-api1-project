const server = require('./api/server');

const PORT = 9000;

// START YOUR SERVER HERE

server.listen(9000, () => {
    console.log(`listening on port ${PORT}`)
})