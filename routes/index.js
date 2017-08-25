var express = require('express');
var router = express.Router();


module.exports = function(passport){
// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
  /* GET login page. */
  router.get('/survey', isAuthenticated, function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('survey', { message: req.flash('message') });
  });

 
  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('login', { message: req.flash('message') });
  });

// route for showing the profile page
    router.get('/profile', isAuthenticated, function(req, res) {
        res.render('profile', {
           // get the user out of session and pass to template
        });
    });
 // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    router.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/survey',
                    failureRedirect : '/'
            }));


/* GET HANDLES Signout*/
 router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});


  return router;
}