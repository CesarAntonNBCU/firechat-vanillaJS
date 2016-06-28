// Initialize Firebase
var config        = {
  apiKey        : "AIzaSyBh9WbSwsA8590HFXDc8IIj8JoVABB_7_0",
  authDomain    : "firechatcomponent.firebaseapp.com",
  databaseURL   : "https://firechatcomponent.firebaseio.com",
  storageBucket : "firechatcomponent.appspot.com",
};
firebase.initializeApp(config);
var provider      = new firebase.auth.GoogleAuthProvider();
var user          = {};
/**
*  firebase auth
*  https://firebase.google.com/docs/auth/web/google-signin
*/
firebase.auth().signInWithPopup(provider).then(function(result) {
  "use strict";
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token         = result.credential.accessToken;
  // The signed-in user info.
  user.name         = result.user.displayName;
  user.avatar       = result.user.photoURL;
  console.info('success @ firebase.auth',result);
  var avatar        = document.createElement('img');
  avatar.src        = user.avatar;
  avatar.alt        = 'Avatar';
  avatar.title      = user.name;
  var userName      = document.createElement('p'),
      userNameText  = document.createTextNode(user.name);
  userName.appendChild(userNameText);
  document.getElementById("user").appendChild(userName);
  document.getElementById("user").appendChild(avatar);
}).catch(function(error) {
  "use strict";
  // Handle Errors here.
  var errorCode     = error.code,
      errorMessage  = error.message;
  // The email of the user's account used.
  var email         = error.email,
  // The firebase.auth.AuthCredential type that was used.
      credential    = error.credential;
  console.warn('error @ firebase.auth',error);
});
/**
*  firebase database
*  https://firebase.google.com/docs/database/web/start#initialize_the_database_web_sdk
*/
var database      = firebase.database(),
    messagesRef   = database.ref('messages'),
    messagesCont  = document.getElementById("messages");
messagesRef.orderByChild('time').on('child_added', function(data) {
  "use strict";
  var messageElm     = document.createElement('firechat-message'),
      messageData    = {},
      messageDom     = {};
  messageData.key      = data.key;
  messageData.user     = data.val().user;
  messageData.avatar   = data.val().avatar;
  messageData.time     = new Date(data.val().time);
  messageData.msg      = data.val().msg;
  console.info('child_added',messageData);
  // Create avatar element
  messageDom.avatar    = document.createElement('img');
  messageDom.avatar.src   = messageData.avatar;
  messageDom.avatar.alt   = 'Avatar';
  messageDom.avatar.title = messageData.user;
  // Create user element
  messageDom.header    = {};
  messageDom.header.text  = document.createTextNode(messageData.user+' - '+messageData.time.getDate()+'/'+(messageData.time.getMonth()+1));
  messageDom.header.elm   = document.createElement('firechat-message-content-header');
  messageDom.header.elm.appendChild(messageDom.header.text);
  // Create message text element
  messageDom.message   = {};
  messageDom.message.text = document.createTextNode(messageData.msg);
  messageDom.message.elm  = document.createElement('p');
  messageDom.message.elm.appendChild(messageDom.message.text);
  // Create message content element
  messageDom.content   = document.createElement('firechat-message-content');
  messageDom.content.appendChild(messageDom.header.elm);
  messageDom.content.appendChild(messageDom.message.elm);
  // Append to new message element
  messageElm.id        = messageData.key;
  messageElm.appendChild(messageDom.avatar);
  messageElm.appendChild(messageDom.content);
  // Append to messages element
  messagesCont.appendChild(messageElm);
  // Autoscroll
  messagesCont.scrollTop = document.getElementById("messages").scrollHeight;
});
messagesRef.orderByChild('time').on('child_changed', function(data) {
  "use strict";
  var message     = {};
  message.key     = data.key;
  message.user    = data.val().msg;
  message.avatar  = data.val().user;
  message.time    = data.val().time;
  message.msg     = data.val().avatar;
  console.info('child_changed',message);
});
messagesRef.orderByChild('time').on('child_removed', function(data) {
  "use strict";
  var message     = {};
  message.key     = data.key;
  console.info('child_removed',message);
});
function isEnterKey (e){
  "use strict";
  if (e.keyCode == 13)
    pushMessage(document.getElementById("new-message").value);
}
function pushMessage (messageText){
  "use strict";
  var newMessage  = {};
  newMessage.user   = user.name;
  newMessage.avatar = user.avatar;
  newMessage.time   = Date.now();
  newMessage.msg    = messageText;
  messagesRef.push(newMessage,emptyMessage)
  .then(function() {
    emptyMessage();
  })
  .catch(function(error) {
    console.warn("error @ pushMessage " + error);
  });
  return newMessage;
}
function emptyMessage(){
  "use strict";
  document.getElementById("new-message").value = '';
}
