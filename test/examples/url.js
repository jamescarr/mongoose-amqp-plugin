var mongoose      = require('mongoose')
  , Schema        = mongoose.Schema
  , mongoose_amqp = require('../../index')
  , URL =  'amqp://guest:guest@localhost:5672'
  , UserSchema = new Schema({
    name: String
  , email: String
})

UserSchema.plugin(mongoose_amqp, {
    exchange:'user'
  , url: URL
});
module.exports = {
    User: mongoose.model('user', UserSchema)
  , url: URL
}

