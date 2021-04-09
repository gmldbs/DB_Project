var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/kinds',function (req, res, next){
	connection.query('SELECT * FROM delivery_kind', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/',function (req, res, next){
	console.log('here good')
	connection.query('SELECT * FROM delivery_info', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/:id',function(req,res,next){
	var id=parseInt(req.params.id, 10)
	var product = products.filter(function (product){
		return product.id === id
	});
	res.send(product)
});

router.post('/add', async function(req, res) {
  
  const order_id = req.body.order_id;
  const delivery_kind = req.body.delivery_kind;
  const delivery_time = req.body.delivery_time;

  connection.query('SELECT count(*) as total FROM delivery_info', function (err, rows) {
  	if(err) throw err;
  	setTimeout(function(){
  	var dnum=rows[0].total;
  		connection.query("INSERT INTO delivery_info values ("+dnum+', '+order_id+', '+delivery_kind+', "'+delivery_time+'")', function (err, row) {
    		if(err) throw err;
    		else res.json({
      			success: true,
      			message: 'Add deliveryList complete!'
    		});
  		});
  	},1000);
  });
});

module.exports = router;