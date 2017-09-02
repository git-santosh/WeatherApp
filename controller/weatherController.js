const fs = require('fs');
const axios = require('axios');
require('dotenv').config({path:'.env'});

exports.homePage = (req,res) =>{
    axios.get(process.env.watherURL+'pune'+'&APPID='+process.env.APPID+'&units='+process.env.units.split(',')[0]).then(function(response){
      var img = "http://openweathermap.org/img/w/" + response.data.weather[0].icon.toString() + ".png"
      res.render('index',{data:response.data ,iconCode : img});
    }).catch(function(err){
        res.send({error:err , failure:true});
    });
  //  res.render('index');
}

exports.showCity =(req,res) =>{
      let city =req.body.cityName;
      axios.get(process.env.watherURL+city+'&APPID='+process.env.APPID+'&units='+process.env.units.split(',')[0]).then(function(response){
        var img = "http://openweathermap.org/img/w/" + response.data.weather[0].icon.toString() + ".png"
        res.send({ajx:response.data ,iconCode : img});
    }).catch(function(err){
        res.send({error:err});
    });
}