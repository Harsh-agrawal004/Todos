const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validatePassword } = require('../controller/commonController')
const user = require('../models/users')

const users = [
    { id: 1, email: 'hagrawal004@gmail.com', password: 'password'}
];

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
   (email, password, done) => {
      const user = users.find(user => {
        return user.email === email
      })
      if (!user) {
        return done(null, false, { message: 'Incorrect email.'});
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.'});
      }
      const returnUser = {
        id: user.id,
        isAuthenticated: true
      };
      return done(null, returnUser)  
     }
));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const findUser = await user.findOne({ id, include: 'role' })
  const userData = {
      id: findUser.id,
      name: findUser.firstName + ' ' + findUser.lastName,
      email: findUser.email,
      role: findUser.role.authority
  }
  return done(null, userData);
});

module.exports = passport;

 