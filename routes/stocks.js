const express    = require('express'),
      router     = express.Router(),
      axios      = require('axios'),
      Stocks     = require('../models/stock');
      
//Index Route - Show all stocks
router.get('/', async (req, res, next) => {
    try{
      let stocks = await Stocks.find({});
      //res.send(stocks);
      res.render('index', {stocks})
      //return res.status(200).json(stocks);
    }catch(err){
      return next(err)
    }
  });
  
//Creat Route - add new stock
router.post('/', async(req, res, next) => {
    const { stockname } = req.body;
  
    try {
      const foundStock = await Stocks.findOne({ stockSymbol: stockname });
      const stockData = await axios.get(`https://api.iextrading.com/1.0/stock/${stockname}/chart/5y`);
      const chartData = await stockData.data.map( item => [ 
        Date.parse(item.date), item.close
      ]);
  
      const newStock = await Stocks.create({
        stockSymbol: stockname,
        data : chartData
      });
      res.redirect('/');
    } catch( err) {
      res.redirect('/');
    }
  });
  
//Delete Route 
router.get('/stocks/:id', async(req, res, next) => {
    try{
      let foundStock = await Stocks.findByIdAndRemove(req.params.id);
      res.redirect('/');
    }catch (err){
      return next(err);
    }
});

      
module.exports = router;
