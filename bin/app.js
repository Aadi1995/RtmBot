'use-strict'

const service=require('../server/service')
slackClient=require('../server/slackClient')
witToken="**********************************************", // your wit token
witClient=require('../server/witClient')(witToken),
http=require('http'),
server=http.createServer(service),
token="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", //Your bot user token
loglevel='verbose',
ClientEvents=slackClient.getCLIENT_EVENTS();
rtm=slackClient.init(token,loglevel,witClient),

rtm.start();
slackClient.addAuthenticatedHandler(rtm,()=> server.listen(3000));

server.on('listening',()=>{
    console.log(`My bot is listening on ${server.address().port} in ${service.get('env')}`);
})