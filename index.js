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
  var conn = amqp.createConnection(options)
  conn.on('error', function(){
    setTimeout(function(){
      connect(options, callback);
    }, 5000);
  });
  conn.on('ready', function(){
    var e = options.exchange;
    if(typeof e == 'string'){
      callback(conn.exchange(e))
    }
    else if(typeof e == 'object'){
      var name = e.name;
      delete e.name;
      callback(conn.exchange(name, e))
    }
  });
}
