'use-strict'

const service= require('../server/service'),
http=require('http'),
server=http.createServer(service);

server.listen(3010);

server.on('listening',()=>{
    console.log(`Buenos_time is listening on ${server.address().port} in ${service.get('env')} `);
})