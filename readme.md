# mongoose-amqp-plugin
This is a handy pluigin that makes [mongoose](http://mongoosejs.com/) models publish to an AMQP
exchange on save. This can be handy if you want to update other systems
when a change happens to one of your models. 

## Installing

```bash
npm install mongoose-amqp-plugin
```

Or include it in your package.json.


## Message Types
The plugin will cause two different types of messages to be triggered:
**update** and **remove**. These get triggered on save and remove,
respectively. Each message will have a routing key that fits the form
<exchangeName>.update and <exchangeName>.remove. See the tests for
further examples. 


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

Or providing an amqp connector url:

```javascript

User.plugin(mongoose_amqp, {
    exchange:'users',
  , url:'amqps://guest:guest@localhost:5672/mySpecialVhost'
})

```

### Model.plugin(mongoose_amqp, options)

The first argument is obviously the plugin. The second argument is an
options object, all of which one (exchange) are optional but contain smart defaults.

  * `exchange` - the exchange to publish the model to on save. The
    exchange type defaults to a topic exchange.
  * `url` - connector url of the amqp broker. For example amqp://guest:guest@localhost:5672
  
  
## License 

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
