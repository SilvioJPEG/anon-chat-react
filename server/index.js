const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config')
const PORT = process.env.PORT || 3001

const server = require('http').Server(app);

async function start() {
    try {
        await mongoose.connect(config.mongoURI).then(() => {console.log('Mongodb connected.')})

        server.listen(PORT, (err) => {
            console.log(`Example app listening at http://localhost:${PORT}`)
        })
    } catch(err) {
        console.log(err)
    }
}

start()