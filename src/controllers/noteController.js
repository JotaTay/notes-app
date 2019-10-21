const debug = require('debug')('app:noteController');
const Evernote = require('evernote');

noteController = () => {
 MY_USER = 'jtraces02';
 MY_SECRET = '4368467df3a8afc8';
 const client = new Evernote.Client({
  consumerKey: MY_USER,
  consumerSecret: MY_SECRET,
  sandbox: true, // change to false when you are ready to switch to production
  china: false, // change to true if you wish to connect to YXBJ - most of you won't
 });

 const authorize = async (req, res) => {
  console.log('generate request tokens');
  // todo: set call back url
  const callbackUrl = "http://localhost:4000/";
  client.getRequestToken(
      callbackUrl,
      (error, oauthToken, oauthTokenSecret) => {
       if (error) {
        // do your error handling here
        console.log("You got an error", error);
       }
       // store your token here somewhere - for this example we use req.session
       // session.oauthToken = oauthToken;
       // session.oauthTokenSecret = oauthTokenSecret;
       res.redirect(client.getAuthorizeUrl(oauthToken));
      });
 };
 // todo: get token
    // client.getAccessToken(
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
    //     })();
 return {
   authorize
 }
};

module.exports = noteController;
