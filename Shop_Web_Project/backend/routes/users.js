var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');

router.get('/', function (req, res) {
  connection.query('SELECT * FROM user', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});

router.post('/update', function (req, res) {
  const user = req.body.user;
  console.log(user)
  connection.query('UPDATE user SET id="'+user.id+'", password="'+user.password+'", name="'+user.name+'", sex="'+user.sex+'", email="'+user.email+'", phone="'+user.phone+'", nickname="'+user.nickname+'", address="'+user.address+'" WHERE uid='+user.uid, function (err, row) {
    console.log(row)
    if(err) throw err;
    else res.json({
      success: true,
      message: 'Update complete!'
    });
  });
});

router.post('/signUp', function (req, res) {
  const id= req.body.id;
  const password= req.body.password;
  const name= req.body.name;
  const sex = req.body.sex;
  const email = req.body.email;
  const phone = req.body.phone;
  const nickname = req.body.nickname;
  const address = req.body.address;
  connection.query('SELECT * FROM user WHERE id = "' + id + '"', function (err, row) {
    if (row[0] == undefined){
      setTimeout(function(){
        connection.query('SELECT count(*) as total from user', function(err, row2) {
          if(err) throw err;
          else {
            setTimeout(function(){
              var uid=row2[0].total;
              console.log('herherherherh')
              connection.query('INSERT INTO user VALUES ('+uid+', "'+id+'", "'+password+'", '+2+', "'+name+'", "'+sex+'", "'+email+'", "'+phone+'", "'+nickname+'", "'+address+ '")', function (err, row) {
                if(err) throw err;
                res.json({
                  success: true,
                  message: 'Sign Up Success!'
                });
              });
            },1000);
          }
        })
    },1000);
    }
    else {
      res.json({
        success: false,
        message: 'Sign Up Failed Please use anoter ID'
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
