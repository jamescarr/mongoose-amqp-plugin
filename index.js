var amqp = require('amqp')

module.exports = exports = function amqpPlugin(schema, options){
  connect(options, function(ex){
    schema.post('save', function(){
      console.log('saving')
      ex.publish(ex.name+'.update', this)
    });
    schema.post('remove', function(){
      ex.publish(ex.name+'.remove', this)
    });
  });
};


function connect(options, callback){
  var conn = amqp.createConnection(options)
  conn.on('error', function(){
    setTimeout(function(){
      connect(options, callback);
    }, 5000);
  });
  conn.on('ready', function(){
    callback(conn.exchange(options.exchange))
  });
}
