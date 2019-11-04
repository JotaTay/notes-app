const debug = require('debug')('app:noteController');
const Evernote = require('evernote');
const config = require('../config');

noteController = () => {
const displayHome = (req, res) => {
    res.render(
        'evernoteLogin',
        {
            nav: [
                { link: 'evernote/oauth', title: 'Authorize App' },
                { link: 'evernote/oauth_callback', title: 'get Request Token' },
                { link: '/', title: 'get Notes' },
            ],
            title: 'evernote',
        });
    };

 const oauth = async (req, res) => {
     const client = new Evernote.Client({
        consumerKey: config.API_CONSUMER_KEY,
        consumerSecret: config.API_CONSUMER_SECRET,
        sandbox: config.SANDBOX,
        china: config.CHINA,
        });

      const callbackUrl = "http://localhost:4000/evernote/oauth_callback";
      client.getRequestToken(
          callbackUrl,
          (error, oauthToken, oauthTokenSecret, results) => {
           if (error) {
               req.session.error = JSON.stringify(error);
               res.redirect('/');
           }
           else {
               // store your token in the session
               req.session.oauthToken = oauthToken;
               req.session.oauthTokenSecret = oauthTokenSecret;

               // redirect the user to oauth the token
               res.redirect(client.getAuthorizeUrl(oauthToken));
               req.session.oauth_verifier = req.query.oauth_verifier;
               req.session.save();
           }
       });
 };

 const oauth_callback = (req, res) => {
     const client = new Evernote.Client({
         consumerKey: config.API_CONSUMER_KEY,
         consumerSecret: config.API_CONSUMER_SECRET,
         sandbox: config.SANDBOX,
         china: config.CHINA
     });
     // todo: get token
     // Sample GET request:
     // https://sandbox.evernote.com/oauth?oauth_consumer_key=internal-dev&
     // auth_token=internaldev.14CD91FCE1F.687474703A2F2F6C6F63616C686F7374.6E287AD298969B6F8C0B4B1D67BCAB1D&
     // oauth_verifier=40793F8BAE15D4E3B6DD5CA8AB4BF62F&oauth_nonce=4078121641140961292&
     // auth_signature=hfA8r3NdMnZbzN0OOmTZIZj6Wkc=&
     // oauth_signature_method=HMAC-SHA1&oauth_timestamp=1429572048&
     // oauth_version=1.0
     client.getAccessToken(
         req.session.oauthToken,
         req.session.oauthTokenSecret,
         req.query.oauth_verifier,
         // 'AB82F367AAD8C68BC0FC1F32CC3B0A99',
         (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
             if (error) {
                 // do your error handling
                 console.log('error', error);
                 // res.redirect('/');
             } else {
                 // store the access token in the session
                 req.session.oauthAccessToken = oauthAccessToken;
                 req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
                 req.session.edamShard = results.edam_shard;
                 req.session.edamUserId = results.edam_userId;
                 req.session.edamExpires = results.edam_expires;
                 req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
                 req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
                 res.redirect('/evernote');
                 }
             });
         };

// const getNotebooks = (req, res ) => {
//     const authenticatedClient = new Evernote.Client({
//         token: req.session.oauthToken,
//         sandbox: true,
//         china: false,
//     });
// };

 const clear = (req, res) => {
    req.session.destroy();
    res.redirect('/');
 };

 return {
    displayHome: displayHome,
    oauth: oauth,
    oauth_callback: oauth_callback,
    clear: clear,
 }
};

module.exports = noteController;
