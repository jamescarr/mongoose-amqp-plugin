var amqp = require('amqp')


module.exports = exports = function amqpPlugin(schema, options){
  connect(options, function(ex){
    schema.post('save', function(){
      ex.publish(ex.name+'.update', this)
    });
    schema.post('remove', function(){
      ex.publish(ex.name+'.remove', this)
    });
  });
};


function connect(options, callback){
  conn = amqp.createConnection()
  conn.on('error', function(){
    console.log("unable to connect to rabbitmq.Retrying in 5000ms");
    setTimeout(function(){
      connect(options, callback);
    }, 5000);
  });
  conn.on('ready', function(){
    var ex = conn.exchange(options.exchange)
    callback(ex);
  });
}
