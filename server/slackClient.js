'use-strict'
const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');
var rtm = null;
let mlp = null;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of ${rtmStartData.team.name} but not yet connected`)
}

function addAuthenticatedHandler(rtm, handler) {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler)
}

function handleOnMessage(message) {
    if(message.text.toLowerCase().indexOf("amigos")!==-1)
    nlp.ask(message.text, (err, res) => {
        if (err) {
            console.log(err); return;
        }
        try {
            if (!(res.entities.intent || res.entities.intent[0] || res.entities.intent[0].value)) {
                throw new Error("Could not extract intent.")
            }
            const intent = require('./intents/' + res.entities.intent[0].value + 'Intent');
            intent.process(res.entities, (error, response) => {
                if (error) {
                    console.log(error.message);
                    return;
                }
                return rtm.sendMessage(response, message.channel,()=>{});
            })
        }
        catch (err) {
            console.log(err);
            console.log(res);
            rtm.sendMessage("Sorry I don't know what you are talking about!", message.channel,()=>{});
        }
    });
};

module.exports.init = function slackClient(token, loglevel, nlpClient) {
    rtm = new RtmClient(token, { dataStore: false, useRtmConnect: true, loglevel: loglevel });
    nlp = nlpClient
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
    return rtm;
}
module.exports.getCLIENT_EVENTS = () => {
    return CLIENT_EVENTS;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
