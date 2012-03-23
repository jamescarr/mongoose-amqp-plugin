var mongoose      = require('mongoose')
  , Schema        = mongoose.Schema
  , mongoose_amqp = require('../../index')

  var UserSchema = new Schema({
    name: String
  , email: String
})

UserSchema.plugin(mongoose_amqp, {exchange:'user'});
module.exports = mongoose.model('user', UserSchema)

