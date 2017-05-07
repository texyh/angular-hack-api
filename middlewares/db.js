var mongoose = require('mongoose');

const ImageSchema = require('../models/image')

module.exports = {
    
    connectDisconnect: (req, res, next) => {
        
        const connection = mongoose.createConnection(req.webtaskContext.secrets.MONGO_URL);
        req.imageModel = connection.model('image', ImageSchema);
        req.on('end', () => {
            mongoose.connection.close();
        })
        next()
    },
}