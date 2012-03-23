var should        = require('should')
  , amqp          = require('amqp')
  , example       = require('./examples/url')
  , helper        = require('./helpers/mongoose')
  , User          = example.User

describe('Mongoose URL Based AMQP Example', function(){
  var queue = null, connection = null;
  before(function(done){
    helper.before(function(){
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
    helper.after()
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
      q.subscribe(function(user, dontcate, props){
        user._id.should.eql(james._id.toString());
        q.unsubscribe(props.consumerTag);
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
  var conn = amqp.createConnection({url:example.url})
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

