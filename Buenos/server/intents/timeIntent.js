'use-strict'
const request=require('superagent');
module.exports.process=function process(intentData,callback){
    if(intentData.intent[0].value!=='time')
    return callback(new Error(`Expected time intent, got ${intentData.intent[0].value}`));
    if(!intentData.location){
        return callback(new Error('Missing Location in time intent')); 
    }
    const location=intentData.location[0].value;
    request.get('http://localhost:3010/service/'+location,(err,response)=>{
        if(err || response.statusCode!=200 || !response.body.result){
            console.log(err);  
            console.log(response);
            callback(false,`Had a problem finding out time in ${location}`)
        }
        else 
        return callback(false,`In ${location} it is now ${response.body.result}`);

    });
}