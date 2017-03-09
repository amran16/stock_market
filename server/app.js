import express from 'express'
import mongoose from 'mongoose'
import Quandle from 'quandl'

const app = express();

mongoose.connect('mongodb://localhost/stock_market');

const stockSchema = new mongoose.Schema({
  stock: String
});

const stock = mongoose.model('Stock', stockSchema);

//const key = 's2ZQzi1XoYQJ6deT7XRb';

app.get('/', function(req, res){
    res.send('New Project!!');
});

app.get('/:searchable', function(req, res){
    let item = req.params.searchable;

    stock.create({
      term: item
    })

    const quandle = new Quandle({
      auth_token: 's2ZQzi1XoYQJ6deT7XRb',
      api_version: 3
    });

    quandle.dataset({
      source: 'WIKI',
      table: 'FB'
    }, {
      order: 'asc',
      exclude_column_names: true,
      start_date: '2016-01-31',
      end_date: '2017-01-30',
      column_index: 4
    }, function(err, response){
       if(err)
        throw err;
      res.send(response);

    });

});













app.listen(process.env.PORT || 7000, function(){
      console.log("Server running on port 7000");
});
