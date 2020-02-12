const debug = require('debug')('app:noteController');
const Evernote = require('evernote');
const config = require('../config');
// EVERNOTE OAUTH FLOW
// check to see if user is authorized
// If not, redirects to Evernote to gain approval
// After approval is granted, we are redirected back to localhost w/ info.
//We'll use that info to retrieve an access token, which we can use to access notes.


noteController = () => {
function displayHome(req, res) {
    res.render(
        'notes',
        {
            nav: [
                // { link: 'notes/oauth', title: 'Authorize App' },
                { link: 'notes/notes', title: 'get notes' },
            ],
            title: 'evernote',
        });
    };

 // const oauth = async (req, res) => {
 //     const client = new Evernote.Client({
 //        consumerKey: config.API_CONSUMER_KEY,
 //        consumerSecret: config.API_CONSUMER_SECRET,
 //        sandbox: config.SANDBOX,
 //        china: config.CHINA,
 //        });

 //      const callbackUrl = "http://localhost:3000/notes/oauth_callback";

 //      client.getRequestToken(callbackUrl,
 //          (error, oauthToken, oauthTokenSecret, results) => {
 //           if (error) {
 //               req.session.error = JSON.stringify(error);
 //               res.redirect('/');
 //           }
 //           else {
 //               // store your token in the req.session
 //               console.log('Storing Token: ', oauthToken)
 //               req.session.oauthToken = oauthToken;
 //               console.log('req.session.oauthToken ', req.session.oauthToken)
 //               req.session.oauthTokenSecret = oauthTokenSecret;
 //               console.log('req.session.oauthTokenSecret ', req.session.oauthTokenSecret)
 //               // redirect the user to oauth the token
 //               res.redirect(client.getAuthorizeUrl(oauthToken));
 //               req.session.oauth_verifier = req.query.oauth_verifier;
 //               req.session.save();
 //           }
 //       });
 // };

 // const oauth_callback = (req, res) => {
 //     const client = new Evernote.Client({
 //         consumerKey: config.API_CONSUMER_KEY,
 //         consumerSecret: config.API_CONSUMER_SECRET,
 //         sandbox: config.SANDBOX,
 //         china: config.CHINA
 //     });
 //     client.getAccessToken(
 //         req.session.oauthToken,
 //         req.session.oauthTokenSecret,
 //         req.query.oauth_verifier, 
 //         // 'AB82F367AAD8C68BC0FC1F32CC3B0A99',
 //         (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
 //             if (error) {
 //                 // do your error handling
 //                 console.log('error', error);
 //                 // res.redirect('/');
 //             } else {
 //                 // store the access token in the session
 //                 req.session.oauthAccessToken = oauthAccessToken;
 //                 req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
 //                 // todo: figure out how and where to save accessToken per user. possibly passport/mongoDB
 //                 console.log('saved req.session.oauthAccessToken', req.session.oauthAccessToken);
 //                 console.log('saved req.session.oauthAccessTokenSecret', req.session.oauthAccessTokenSecret);
 //                 req.session.edamShard = results.edam_shard;
 //                 req.session.edamUserId = results.edam_userId;
 //                 req.session.edamExpires = results.edam_expires;
 //                 req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
 //                 req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
 //                 res.redirect('/notes');
 //                 }
 //               }
 //             );
 //           };

function getNotes(req, res ) {
    // const authenticatedClient = new Evernote.Client({
    //   token: req.session.oauthAccessToken,
    //   sandbox: true,
    //   china: false
    // });
    const noteStore = authenticatedClient.getNoteStore().then(() => {
      const notes = getNotes();
      console.log('notes', notes)
    });
    console.log('noteStore', noteStore)
  };

   const clear = (req, res) => {
    req.session.destroy();
    res.redirect('/');
   };

 return {
    displayHome: displayHome,
    // oauth: oauth,
    // oauth_callback: oauth_callback,
    getNotes: getNotes,
    clear: clear,
 }
};

module.exports = noteController;
