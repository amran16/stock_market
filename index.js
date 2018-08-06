const express      = require('express'),
      bodyParser   = require('body-parser'),
      mongoose     = require('mongoose'),
      sctockRoutes = require('./routes/stocks'),
      app = express(); 

const PORT = process.env.PORT || 5000;

//mongoose connections
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/stock_market', {
  keepAlive: true
});

//Set static path
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});


//express routes
app.use(sctockRoutes);


//Server Setup
app.listen(PORT, () => {
  console.log(`Serving starting on ${PORT}`);
})
