var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  name: String,
  text: String,
  beer_id: String
});

var beerSchema = new mongoose.Schema({
  name: String,
  style: String,
  image_url: String,
  abv: Number,
  ratings: [Number],
  avarage: Number,
  reviews: [reviewSchema]
});

var Beer = mongoose.model('beer', beerSchema);

module.exports = Beer;