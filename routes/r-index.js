const rTodo = require('./r-ToDo')


const passport = require('passport');

module.exports = (app) => {
    app.post('/login',
    passport.authenticate('local', { failureRedirect: '/'}),
    (req, res) => {
        console.log("request body ====>", req.body)
        console.log("user details ====>", req.user)
        console.log("user authenticated ====>", req.isAuthenticated())
        return res.redirect('/toDo/');
    });

    app.get('/logout', function  (req, res )
    {req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });

    app.use('/toDo', rTodo)
}