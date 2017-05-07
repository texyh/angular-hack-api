var mongoose = require('mongoose');

const Image = require('../models/image');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: '******',
  api_key: '*********',
  api_secret: '**************'
});

module.exports = (app) => {
  app.get('/images', (req, res) => {
    req.imageModel.find({}).sort({ 'created_at': -1 }).exec((err, images) => res.json(images))
  });

  app.post('/images', (req, res) => {
    let cloudUrl = getUrl(req.body.url)
      .then((url) => {
        const newImage = new req.imageModel(Object.assign({},
          req.body,
          { created_at: Date.now(), url: url }));
        newImage.save((err, savedImage) => {
          res.json(savedImage)
        })

      })

  })

  app.put('/images', (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.imageModel.findOne({ _id: idParam }, (err, imageToUpdate) => {
      const updatedImage = Object.assign(imageToUpdate, req.body);
      updatedImage.save((err, image) => res.json(image))
    })
  })

  app.delete('/images', (req, res) => {
    const idParam = req.webtaskContext.query.id;
    req.imageModel.remove({ _id: idParam }, (err, removedImage) => res.json(removedImage));
  })

  var getUrl = function (imageUrl) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(imageUrl, (res) => {
        resolve(res['url']);
      });
    });
  }
}