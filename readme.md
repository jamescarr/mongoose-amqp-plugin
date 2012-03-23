# mongoose-amqp-plugin
This is a handy pluigin that makes mongoose models publish to an AMQP
exchange on save. This can be handy if you want to update other systems
when a change happens to one of your models.


## Example Usage

```javascript
var mongoose = require('mongoose')
  , mongoose_amqp = require('mongoose-amqp')
  , Schema   = mongoose.Schema

var User = new Schema({
    name: String
  , email: String
})

User.plugin(mongoose_amqp, {exchange:'users'})


```

### Model.plugin(mongoose_amqp, options)

The first argument is obviously the plugin. The second argument is an
options object, all of which one (exchange) are optional but contain smart defaults.

  * `exchange` - the exchange to publish the model to on save.
  * `host` - host of the amqp broker. Defaults to localhost
  * `port` - port of the amqp broker. Defaults to 5672
  * `username` - the username to login with. Defaults to guest.
  * `password` - the password to login with. Defaults to guest.
  * `vhost`    - the vhost to connect to. Defaults to '/'
  
cense 

(The MIT License)

Copyright (c) 2012-2012 James R. Carr &lt;james.r.carr@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
