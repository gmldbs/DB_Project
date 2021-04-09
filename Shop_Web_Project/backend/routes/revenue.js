var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/total',function (req, res, next){
	connection.query('SELECT sum(total) as total_revenue, sum(count) as total_count FROM revenue', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});
router.get('/',function (req, res, next){
	connection.query('SELECT * FROM revenue', function (err, rows) {
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