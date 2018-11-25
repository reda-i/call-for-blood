var express = require('express');
var router = express.Router();
var User = require('../lib/User');

router.get('/',function(req, res, next){
    res.render('index', {title:'Express'});
});

router.post('/register',function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    
    var nuser= new User();
    nuser.username=username;
    nuser.password=password;
    nuser.email=email;
    nuser.save(function(err,savedUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});
router.post('/login',function(req, res, next){
    var password = req.body.password;
    var email = req.body.email;
    
    var nuser= User();
    nuser.authenticate(function(err,savedUser){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});


module.exports = router;