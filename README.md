# RtmBot
->Rtm Bot is a application which runs on a slack channel using slack Api, wti api for NLP and google api for time.
Steps to run:-
Install node modules
1. npm install --save express
2. npm install --save superagent
3. npm install --save @slack/client

Generate  Tokens mentioned  below :-

-> Create your Slack bot, generate a api token copy and paste the token in app.js of Buenos project
-> Create a wit account and generate a api token for wit client and replace the token in app.js of Buenos project
-> Generate the api token for google time and geocoding api and replcae it in app.js of of Buenos-time project.

Open Buenos and Buenos-time in seperate terminal

run node bin/app.js 

in each terminal.

Go to slack channel and  type the message including the name of you bot.

Refrences:- 1. https://api.slack.com/    (Create workspace then create a channel and add a new app(search for bots) to                  generate the token )
            2. https://developers.google.com/maps/documentation/geocoding/start  (to get the latitute and longitude of a place)
            3. https://developers.google.com/maps/documentation/timezone/start (to get the time of a particular latitude and longitude).
            4. https://wit.ai/  (For nlp processing).