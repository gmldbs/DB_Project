var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/count',function (req, res, next){
	connection.query('SELECT count(*) as total_count FROM order_info', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/',function (req, res, next){
	connection.query('SELECT * FROM order_info', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});
router.get('/find_best',function (req, res, next){
	connection.query('select pid, count(*) as total from order_info group by pid', function (err, rows) {
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
function sleep (delay) {
   var start = new Date().getTime();
   while (new Date().getTime() < start + delay);
}

router.post('/saveState', async function(req, res) {
  
  const order_id = req.body.order_id;
  const state = req.body.state;

  connection.query('UPDATE order_info SET state='+state+' where order_id='+order_id, function (err, rows) {
    if (err) throw err;
    else res.send(rows);
  });
});
router.post('/addorder', function(req, res) {
  const uid = req.body.uid;
  const products = req.body.products;
  const address = req.body.address;
  const order_time = req.body.order_time;
  const state = 0;
  //var order_id;
  console.log(order_time);
  console.log(products.length);

  connection.query('SELECT count(*) as total FROM order_info', function (err, rows) {
  	if(err) throw err;
  	setTimeout(function(){
  	var order_id=rows[0].total;
  	var query = "INSERT INTO order_info values "
  		for(var i=0; i<products.length;i++)
  		{
  			query+='('+order_id+', '+products[i].pid+', '+uid+', "'+order_time+'", "'+address+'", '+state+')'
  			if(i==products.length-1) query+=';'
  			else query+=','
  			order_id++;
  		}
  		connection.query(query, function (err, row) {
    			if(err) throw err;
    			else res.json({
      				success: true,
      				message: 'Add orderList complete!'
    			});
  			});
  	},1000);
  	
  	//if(rows.length==0) {
  		
  	/*}
  	else {
  		res.json({
      		success: true,
      		message: 'Already exist product in Cart!'
    	})
  	}*/
  });


  /*connection.query('SELECT count(*) as total from order_info', function(err, row) {
  	if(err) throw err;
  	else order_id=row.total;
  	console.log(row.total);
  		for(var i=0; i<products.length; i++)
  		{
  			const order_id=row.total+i;
  			console.log('INSERT INTO order_info values ('+order_id+', '+products[i].pid+', '+uid+', "'+order_time+'", "'+address+'", '+state+')');
  			connection.query('INSERT INTO order_info values ('+order_id+', '+products[i].pid+', '+uid+', "'+order_time+'", "'+address+'", '+state+')', function(err, row) {
  				if(err) throw err;
  			});
  		}
  });*/
});
module.exports = router;