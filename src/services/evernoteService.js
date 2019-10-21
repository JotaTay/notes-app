
const express = require('express');
const debug = require('debug')('app:evernoteService');

evernoteService = () => {
MY_USER = 'jtraces02';
MY_SECRET = '4368467df3a8afc8';
let session = {
    oauthToken: '',
    oauthTokenSecret: ''
};

const authorizeClient = async () => {
    const client = new Evernote.Client({
        consumerKey: MY_USER,
        consumerSecret: MY_SECRET,
        sandbox: true, // change to false when you are ready to switch to production
        china: false, // change to true if you wish to connect to YXBJ - most of you won't
    });
    console.log('generate request tokens');
    const callbackUrl = "http://localhost:3000/oauth_callback";
    client.getRequestToken(
        callbackUrl,
        async (error, oauthToken, oauthTokenSecret) => {
            if (error) {
                // do your error handling here
                console.log("You got an error", error);
            }
            // store your token here somewhere - for this example we use req.session
            session.oauthToken = oauthToken;
            session.oauthTokenSecret = oauthTokenSecret;
            return client.getAuthorizeUrl(session.oauthToken)
            })
        };
    return {
        authorizeClient
    }
};



module.exports = evernoteService();
