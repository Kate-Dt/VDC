var auth2;
var user;
var profile;
var initClient = function() {
    gapi.load('auth2', function(){
        auth2 = gapi.auth2.init({
            client_id: '836115278484-j879fhs956rgnuuoqsq6ie7nqs7n53gf.apps.googleusercontent.com'
        });
        auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
    });
};
var onSuccess = function(guser) {
    user = guser;
    profile = user.getBasicProfile();
    console.log('Signed in as ' + profile.getName());
};
var onFailure = function(error) {
    console.log(error);
};

var getUser = function(){
    return user;
};

var getProfile = function(){
    return profile;
};

exports.initClient = initClient;
exports.getUser = getUser;
exports.getProfile = getProfile;