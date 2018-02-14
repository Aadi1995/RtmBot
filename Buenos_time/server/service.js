'use-strict'
const express=require('express'),
service=express(),
request=require('superagent'),
moment=require('moment');

//geocoding XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//https://maps.googleapis.com/maps/api/geocode/json?address=London&key=XXXXXXXXXXXXXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXX

// time XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

service.get('/service/:location',(req,res,next)=>{
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +  req.params.location +'&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',(err,response)=>{
        if(err){
            console.log(err)
            return res.sendStatus(500);
        }
        const location=response.body.results[0].geometry.location;
        const timestamp=+moment().format('X');
        request.get('https://maps.googleapis.com/maps/api/timezone/json?location='+location.lat+','+location.lng+'&timestamp='+timestamp+'&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',(err,response)=>{
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