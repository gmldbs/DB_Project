var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');

router.post('/getcart', async function(req, res) {
  
  const uid = req.body.uid;

  connection.query('SELECT pid FROM cart WHERE uid='+uid, function (err, rows) {
    if (err) throw err;
    else res.send(rows);
  });
});

router.post('/addcart', function (req, res) {
  const uid = req.body.uid;
  const pid = req.body.pid;
  connection.query('SELECT * FROM cart WHERE uid='+uid+' and pid='+pid, function (err, rows) {
  	if(err) throw err;
  	if(rows.length==0) {
  		connection.query('INSERT INTO cart VALUES ('+uid+', '+pid+')', function (err, row) {
    		if(err) throw err;
    		else res.json({
      			success: true,
      			message: 'Add cart complete!'
    		});
  		});
  	}
  	else {
  		res.json({
      		success: true,
      		message: 'Already exist product in Cart!'
    	})
  	}
  });
});
router.post('/deletecart', function (req, res) {
  const uid = req.body.uid;
  const pid = req.body.pid;
    connection.query('DELETE FROM cart WHERE uid = ' + uid + ' and pid = '+pid, function (err, row) {
      if(err) throw err;
      else {
        res.json({
          success: true
        })
      }
    });
  
});

router.post('/deletecartAll', function (req, res) {
  const uid = req.body.uid;
    connection.query('DELETE FROM cart WHERE uid = "' + uid + '"', function (err, row) {
      if(err) throw err;
      else {
        res.json({
          success: true
        })
      }
    });
  
});

router.post('/login', function (req, res) {
  const user = {
    'id': req.body.userid,
    'password': req.body.password
  };
  connection.query('SELECT * FROM user WHERE id = "' + user.id + '"', function (err, row) {
    if (err) {
      res.json({ // 매칭되는 아이디 없을 경우
        success: false,
        message: 'Login failed please check your id!!'
      })
    }
    if (row[0] !== undefined && row[0].id === user.id) {
      //bcrypt.compare(user.password, row[0].password, function (err, res2) {
      	if(user.password === row[0].password) {
        //if (res2) {
          res.json({ // 로그인 성공 
            success: true,
            message: 'Login successful!',
            user : row[0]
          })
        //}
        }
        else {
          res.json({ // 매칭되는 아이디는 있으나, 비밀번호가 틀린 경우           
            success: false,
            message: 'Login failed please check your password!'
          })
        }
      }
      //})
    })
});



module.exports = router;
