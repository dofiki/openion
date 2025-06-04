import { Strategy as LocalStrategy } from 'passport-local';
import User from "../models/user.model.js"; 
import { validatePassword } from "../utils/password.utils.js"; 

function configurePassport(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username }); 
        if (!user) return done(null, false, { message: "User not found" });

        const isValid = validatePassword(password, user.hash, user.salt);
        if (!isValid) return done(null, false, { message: "Invalid password" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); 
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

export default configurePassport;
