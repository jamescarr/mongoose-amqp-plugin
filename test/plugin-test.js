var should        = require('should')
  , mongoose      = require('mongoose')
  , Schema        = mongoose.Schema
  , mongoose_amqp = require('../index')
  , amqp          = require('amqp')

var UserSchema = new Schema({
    name: String
  , email: String
})

UserSchema.plugin(mongoose_amqp, {exchange:'user'});
var User = mongoose.model('user', UserSchema)

describe('Mongoose AMQP', function(){
  var queue = null, connection = null;
  before(function(done){
    mongoose.connect('mongodb://localhost/mongoose-amqp-test', function(){
      User.remove(function(){
        createAmqpConnection(function(conn, q){
          queue = q;
          connection = conn
          done();
        });
      });
    });
  });
  after(function(){
    mongoose.disconnect();
    connection.end();
  });

  it('should publish the model on save', function(done){
    queue.subscribe(function(user, dunno, props){
      user.name.should.eql(james.name)
      user.email.should.eql(james.email)
      user._id.should.eql(james._id.toString())
      queue.unsubscribe(props.consumerTag)
      done()
    });
    var james = new User({name:'james', email:'jc@example.com'});
    james.save()
  });

  it('should publish deletions', function(done){
    connection.queue('mongoose-amqp-test-deletions', function(q){
      q.bind('user', 'user.remove');
      q.subscribe(function(user){
        user._id.should.eql(james._id.toString());
        done()
      });
      
      var james = new User({name:'james', email:'jc@example.com'});
      james.save(function(){
        james.remove()
      });
    });
  });
});



function createAmqpConnection(callback){
  var conn = amqp.createConnection()
  conn.on('ready', function(){
    var exchange = conn.exchange('user')
    var queue = conn.queue('mongoose-amqp-test-queue', function(q){
      q.bind('user', 'user.update');
      callback(conn, q);
    });
  });
  conn.on('error', function(){
    console.log("unable to connect to rabbitmq server on localhost. Is it running?");
  });
}

