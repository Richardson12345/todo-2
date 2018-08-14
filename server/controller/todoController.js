const todoModel = require("../model/todoModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const axios = require("axios");

class Controller {
    static addTodo (req,res) {
        let token = req.headers.token;
        jwt.verify(token, "secret", ( err,decoded )=>{
            if(err){
                console.log(err);
                res
                .status(500)
                .json(err)
            }else{
                let user = decoded._id;
                // let date = new Date( ...req.body.due.split(" ") );
                todoModel.create({
                    todo: req.body.todo,
                    description: req.body.description,
                    due: req.body.due,
                    user: mongoose.Types.ObjectId(user)
                }, (err,data)=>{
                    if(err){
                        console.log(err);
                        res
                        .status(500)
                        .json(err)
                    }else{
                        res
                        .status(201)
                        .json(data)
                    }
                })
            }
        })
    }
    
    static readTodo (req,res) {
        let token = req.headers.token;
        jwt.verify(token, "secret", (err,decoded)=>{
            if(err){
                console.log(err);
                res
                .status(500)
                .json(err)
            }else{
                // res.json(decoded)
                let user = decoded._id;
                todoModel.find({
                    user: mongoose.Types.ObjectId(user)
                },(err,data)=>{
                    if(err){
                        console.log(err);
                        res
                        .status(500)
                        .json(err)
                    }else{
                        res
                        .status(200)
                        .json(data)
                    }
                })      
            }
        })
    }

    static updateTodo (req,res) {
        // let due = new Date(...req.body.due.split(" "))
        let id = req.params.id;
        todoModel.updateOne({ _id: id },
        {
            todo: req.body.todo,
            description: req.body.description,
            due: req.body.due
        },
        ( err,changes )=>{
            if(err){
                console.log(err);
                res
                .status(500)
                .json(err)
            }else{
                res
                .status(200)
                .json(changes)
            }
        })
    }

    static deleteTodo (req,res) {
        let id = req.params.id;
        todoModel.deleteOne({ _id: mongoose.Types.ObjectId(id)},
        ( err,changes )=>{
            if(err){
                console.log(err)
                res
                .status(500)
                .json(err)
            }else{
                res
                .status(201)
                .json(changes)
            }
        })
    }
    
    static getWeather (req, res) {
        // let location = req.params.location;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=Jakarta&units=metric&APPID=f2f66974d3b81810ac6b28abfcea0367`
        axios.get(url)
        .then((result) => {
            // console.log('made it')
            console.log(result.data);
            let data = result.data;
            res
            .status(200)
            .json(data);
        })
        .catch((err) => {
            // console.log('err')
            console.log(err);
            res
            .status(500)
            .json(err);
        })
    }
}

module.exports = Controller;