var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.post('/add', async function(req, res) {
  
  const name = req.body.name;
  const price = req.body.price;
  const kind = req.body.kind;
  const comments = req.body.comments;
  const gender = req.body.gender;
  connection.query('SELECT count(*) as total FROM product', function (err, rows) {
    if (err) throw err;
    setTimeout(function(){
  	var pid=rows[0].total;
  	var query = 'INSERT INTO product values ('+pid+', "'+name+'", '+price+', '+kind+', "'+comments+'", '+gender+')'
  	connection.query(query, function (err, row) {
    		if(err) throw err;
    		else res.json({
      			success: true,
     			message: 'Add product complete!'
   			});
		});
  	},1000);
  });
});

router.get('/',function (req, res, next){
	connection.query('SELECT * FROM product', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/kinds',function (req, res, next){
	connection.query('SELECT * FROM product_kind', function (err, rows) {
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

module.exports = router;