const { google } = require("googleapis");

const FIREBASEAPI =
  "https://fcm.googleapis.com/v1/projects/aspiringingenuity-01/messages:send";

const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";

let SCOPES = [MESSAGING_SCOPE];

var http = require("http");

function gettAccessToken() {
  return new Promise(function (resolve, reject) {
    var key = require("./aspiringingenuity-dac7c-firebase-adminsdk-51rjy-23d72dee82.json");
    var jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

module.exports = gettAccessToken;
