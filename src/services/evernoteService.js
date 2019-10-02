const Evernote = require('evernote');
const express = require('express');
const debug = require('debug')('app:evernoteService');

MY_USER = 'jtraces02';
MY_SECRET = '4368467df3a8afc8';

const authorize = () => {
    console.log('Begin Authorization');
    const callbackUrl = "http://localhost:3000/oauth_callback";
    const client = new Evernote.Client({
        consumerKey: MY_USER,
        consumerSecret: MY_SECRET,
        sandbox: true, // change to false when you are ready to switch to production
        china: false, // change to true if you wish to connect to YXBJ - most of you won't
    });
    client.getRequestToken(
        callbackUrl,
        (error, oauthToken, oauthTokenSecret) => {
            if (error) {
                // do your error handling here
                console.log("You got an error", error);
            }
            const app = express();
            // store your token here somewhere - for this example we use req.session
            console.log('OAUTHTOKEN', oauthToken);
            console.log('OauthTokenSecret', oauthTokenSecret);
            //todo: redirect to evernoteURL
            const evernoteURL =  client.getAuthorizeUrl(oauthToken);
        });

    // client.getAccessToken(
    //     req.session.oauthToken,
    //     req.session.oauthTokenSecret,
    //     req.query.oauth_verifier,
    //
    //     (error, oauthToken) => {
    //         if (error) {
    //             // do your error handling
    //             console.log('error', error);
    //         } else {
    //             // oauthAccessToken is the token you need;
    //             const authenticatedClient = new Evernote.Client({
    //                 token: oauthToken,
    //                 sandbox: true,
    //                 china: false,
    //             });
    //             const noteStore = authenticatedClient.getNoteStore();
    //             noteStore.listNotebooks().then(function(notebooks) {
    //                 console.log(notebooks); // the user's notebooks!
    //             });
    //         }
    //     });
};

module.exports = authorize();
