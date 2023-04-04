const rTodo = require('./r-ToDo')


const passport = require('passport');

module.exports = (app) => {
    app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login'}),
    (req, res) => {
        console.log("request body ====>", req.body)
        console.log("user details ====>", req.user)
        console.log("user authenticated ====>", req.isAuthenticated())
        return res.redirect('/toDo/');
    });
    app.use('/toDo', rTodo)
}