var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , em       = new(require('events')).EventEmitter
  , monamqp  = require('../index')
  , amqp     = require('amqp')
  , UserSchema = new Schema({
      name: String
    , dob: Date
  })
  , messageCount = 0;

UserSchema.plugin(monamqp, {exchange:'user'})

var User = mongoose.model('user', UserSchema)

var conn = amqp.createConnection()
conn.on('ready', function(){
  var ex = conn.exchange('user');
  conn.queue('mongoose-amqp-example', function(q){
    q.bind('user', '#')
    em.emit('subscribed');

    q.subscribe(function(user, headers, deliveryInfo){
      console.log(user);
      console.log("routing key: " + deliveryInfo.routingKey)
      if(++messageCount >=2){
        console.log("goodbye!")
        conn.end()
        process.exit();
      }
    });
  });
});


em.on('subscribed', function(){
  mongoose.connect('mongodb://localhost/example', function(){
    var user = new User({name:'Homer Simpson', dob: new Date()});
    user.save(function(){
      console.log('taking a nap for 2 seconds then deleting');
      setTimeout(function(){
        user.remove();
      }, 2000);
    });
  });

});


