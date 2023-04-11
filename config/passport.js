const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validatePassword } = require('../controller/commonController')
const users = require('../models/users')

// const users = [
//     { id: 1, email: 'hagrawal004@gmail.com', password: 'password'}
// ];

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
async (email, password, done) => {
  console.log( email, password);

  const findUser = await users.findOne( {email, include: 'role' })
  console.log("user");
  if(!findUser) {
      return done(null , false ,{ message:'Incorrect email'});
  }
  if(!validatePassword( password , findUser.password)) {
      return done(null, false , { message: 'Incorrect password'});
  } console.log("user2");
  const returnUser= {
      id: findUser.id ,
      name : findUser.firstName + ' ' + findUser.lastName,
      email : findUser.email,
      role :findUser.role.authority
  }
  return done(null, returnUser);
}
));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const findUser = await users.findOne({ id, include: 'role' })
  const userData = {
      id: findUser.id,
      name: findUser.firstName + ' ' + findUser.lastName,
      email: findUser.email,
      role: findUser.role.authority
  }
  return done(null, userData);
});

module.exports = passport;

 