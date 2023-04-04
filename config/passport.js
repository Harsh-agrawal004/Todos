const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    return done(null,user);
});

module.exports = passport;

 