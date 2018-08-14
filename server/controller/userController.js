var userModel = require("../model/userModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var FB = require('fb');

class Controller {
    static signup ( req,res ) {
        let password = req.body.password;
        let saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash)=>{
            if(err){
                console.log(err);
                res
                .status(500)
                .json(err);
            }else{
                userModel.create({
                    username: req.body.username,
                    email : req.body.email,
                    password: hash
                },( err,data )=>{
                    if(err){
                        console.log(err)
                        res
                        .status(500)
                        .json(err);
                    }else{
                        jwt.sign( {
                            _id : data._id,
                            username: data.username,
                            email: data.email
                        } , "secret" ,
                        ( err, token )=>{
                            if(err){
                                res
                                .status(500)
                                .json(err);
                                console.log(err)
                            }else{
                                res
                                .status(200)
                                .json(token)
                            }
                        })
                    }
                })
            }
        })
    }

    static signin ( req,res ) {
        userModel.find( { username: req.body.username },
        ( err, user )=>{
            if(err || user.length == 0 ){
                console.log(err);
                res
                .status(404)
                .json(err)
            }else{
                let hash = user[0].password;
                bcrypt.compare( req.body.password , hash,
                ( err, success )=>{
                    if(err || success == false){
                        console.log(hash);
                        console.log(req.body.password)
                        console.log(err);
                        res
                        .status(404)
                        .json({
                            err,
                            msg: "wrong password or email"
                        })
                    }else{
                        let current = user[0]
                        jwt.sign( {
                            _id : current._id,
                            username: current.username,
                            email: current.email
                        } , "secret" ,
                        ( err, token )=>{
                            if(err){
                                res
                                .status(500)
                                .json(err);
                                console.log(err)
                            }else{
                                res
                                .status(200)
                                .json(token)
                            }
                        })
                    }
                })
            }
        })
    }

    static fbSignIn(req,res){
        let fbToken  = req.body.fbToken;
        console.log(fbToken, 'fbtoken')
        let addition = '#@#!#!'
        FB.api('me', { fields: ['id', 'name', "email"], access_token: fbToken }, function (result) {
            // console.log(err)
            console.log(result, 'fb credentials');
            let fbUser = `${result.name}${addition}`
            console.log(fbUser)
            userModel.findOne({username : fbUser},(err,user)=>{
                if(err){
                    res
                    .status(500)
                    .send(err)
                }else{
                    console.log('user', user)
                    if(user === undefined || user === null){
                        userModel.create({
                            username: fbUser,
                            email: result.email,
                            password: fbUser
                        },(err,success)=>{
                            if(err){
                                console.log(err)
                            }else{
                                console.log(user)
                                jwt.sign({
                                    _id: user._id,
                                    name: user.name,
                                    email: user.email
                                }, 'secret',(err,token)=>{
                                    console.log(token)
                                    res.send(token)
                                })
                            }
                        })
                    }else{
                        console.log('found a user')
                        jwt.sign({
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        },'secret',(err,token)=>{
                            console.log(token)
                            res.send(token)
                        })
                    }
                }
            })
        })
    }
}

module.exports = Controller;