angular.module('BrandImageManagerApp')
       .controller('NavController', function(AuthFactory, AccessService, $window) {

  console.log('NavController loading!')
  var nav = this;
  var authFactory = AuthFactory;
  nav.displayLogout = false;
  nav.admin = false;
  nav.message = {
      text: false,
      type: 'info',
  };


  authFactory.isLoggedIn()
    .then(function(response) {
      if (response.data.status) {
          nav.admin = response.data.user.admin;
          nav.displayLogout = true;
          authFactory.setLoggedIn(true);
          nav.username = response.data.name;
          // console.log('username', nav.username);
          nav.user = response.data.user;
          AccessService.getDepartmentIds();
          // console.log('nav.user is', nav.user);
          AccessService.storeUserAccess(nav.user);
      } else { // is not logged in on server
          nav.admin = false;
          nav.displayLogout = false;
          authFactory.setLoggedIn(false);
      }
  },

  function() {
      nav.message.text = 'Unable to properly authenticate user';
      nav.message.type = 'error';
  });

  nav.logout = function() {
    authFactory.logout()
    .then(function(response) { // success
      console.log('inside nav controller');
      nav.admin = false;
      nav.displayLogout = false;
      authFactory.setLoggedIn(false);
      nav.username = '';
      // window.location.replace('https://accounts.google.com/Logout');
      // $window.location.href = '/'; // forces a page reload which will update our NavController

    }, function(response) { // error
        nav.message.text = 'Unable to logout';
        nav.message.type = 'error';
      });
  };

  nav.pretty = function (name) {
    if (name == undefined) {
      return;
    }
    var prettyUserDept = name.toLowerCase();
    return prettyUserDept;
  };

});
