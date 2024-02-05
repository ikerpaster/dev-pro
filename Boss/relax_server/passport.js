import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";

const GOOGLE_CLIENT_ID ="712941348589-j66bkevf0jke98fjec786fc4o9o45q5h.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET ="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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport