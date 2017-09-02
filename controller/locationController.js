const fs = require('fs');
const axios = require('axios');
require('dotenv').config({path:'.env'});

exports.homePage = (req,res) =>{
    axios.get(process.env.getIP).then(function(location){
        axios.get(process.env.forcastURL+'lat='+location.data.lat+'&lon='+location.data.lon+'&APPID='+process.env.APPID+'&units='+process.env.units.split(',')[0]).then(function(response){
            //var img = "http://openweathermap.org/img/w/" + response.data.weather[0].icon.toString() + ".png";
            res.render('location',{data:response.data});
        }).catch(function(err){
            res.send({error:err.message , failure:true});
        })
    }).catch(function(err){
        res.send({error:err.message , failure:true});
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