const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qodestek')
    .then(() => console.log('database connected successfully'))
    .catch((error) => console.error(error));