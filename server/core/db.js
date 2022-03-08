const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,
    (err) => { 
        if (err) { 
            throw Error(err);
        } else {
            console.log("Mongodb connected.")
        }
    }
); 