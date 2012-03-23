var mongoose      = require('mongoose')

module.exports = {
  before: function(done){
    mongoose.connect('mongodb://localhost/mongoose-amqp-test', done)
  },
  after: function(done){
    mongoose.disconnect();
    if(done) done()
  }
}

