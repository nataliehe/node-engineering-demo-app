var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  message: String,
  created: {
       type: Date,
       default: Date.now
   },
  comments: [{
    message: String,
    created: {
      type: Date,
      default: Date.now
    }
  }]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;


