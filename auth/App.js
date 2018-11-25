const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res) => {
    res.json({
        message:'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken,(req,res) => {
    jwt.verify(req.token,'whatevea',(err, authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'Post sent',
                authData
            });
        }
    })
    
});

app.post('/login', (req,res)=>{
    //Dumb user 
    const user ={
        id: 1,
        username: 'reda',
        email: 'adecentname@gmail.com'
    }
    //synchronous version which contains a call back
    jwt.sign({user} ,'whatevea',{expiresIn: '10d'},(err,token) => {
        res.json({
            token
        });
    });


});
//Token Format
//Authorization : Bearer <access_token>


//The verify token func
function verifyToken(req, res, next){
    // Get the auth headers
    const bearerHeader= req.headers['authorization'];
    //check if defined
    if( typeof bearerHeader !== 'undefined'){
        //split at the space to get the token 
        const bearer = bearerHeader.split(' ');
        const mytoken =bearer[1];
        req.token= mytoken;
        //call next middleware
        next();
    }
    else{
        //Wrong auth
        res.sendStatus(403);
    }
}


app.listen(3000,() => console.log('Server started on port 3000'));