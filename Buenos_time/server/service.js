'use-strict'
const express=require('express'),
service=express(),
request=require('superagent'),
moment=require('moment');

//geocoding AIzaSyCF2T2LBwjAWoP-I1qs3xQt0BNBwIWjRQU

//https://maps.googleapis.com/maps/api/geocode/json?address=London&key=AIzaSyCF2T2LBwjAWoP-I1qs3xQt0BNBwIWjRQU

// time AIzaSyCWGKZorsZYaeP1BV7NvtN6TWuimvATzFk
//https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyCWGKZorsZYaeP1BV7NvtN6TWuimvATzFk

service.get('/service/:location',(req,res,next)=>{
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +  req.params.location +'&key=AIzaSyCF2T2LBwjAWoP-I1qs3xQt0BNBwIWjRQU',(err,response)=>{
        if(err){
            console.log(err)
            return res.sendStatus(500);
        }
        const location=response.body.results[0].geometry.location;
        const timestamp=+moment().format('X');
        request.get('https://maps.googleapis.com/maps/api/timezone/json?location='+location.lat+','+location.lng+'&timestamp='+timestamp+'&key=AIzaSyCWGKZorsZYaeP1BV7NvtN6TWuimvATzFk',(err,response)=>{
            if(err){
                console.log(err);
                res.sendStatus(500);
            }
            const result=response.body;
            const timestring =moment.unix(timestamp+result.dstOffset+result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
            res.json({result:timestring})
        })
    })
});
module.exports=service;