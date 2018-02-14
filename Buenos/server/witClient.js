'use-strict'

const request = require('superagent');
function handleWitResponse(res) {
    console.log(res);
    return res;
}
module.exports = function witClient(token) {
    const ask = function ask(message, callBack) {
        request.get('https://api.wit.ai/message').set('Authorization', 'Bearer ' + token)
            .query({ v: '13/02/2018' })
            .query({ q: message })
            .end((err, res) => {
                if (err) {
                    callBack(err)
                }
                if (res.statusCode != 200) {
                    return callBack(`Expected status 200 but got ${res.statusCode}`);
                }
                const witResponse = handleWitResponse(res.body);
                return callBack(null, witResponse);
            })
    }

    return {
        ask: ask
    }
}