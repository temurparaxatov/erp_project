import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from '../database/index.js';

export default passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await db('users').where({ google_id: profile.id }).first();
                if (!user) {
                    user = await db('users').insert({
                        google_id: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    }).returning('*');
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    console.log('Serializing User:', user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing User with ID:', id);
    try {
        const user = await db('users').where({ id }).first();
        console.log('User Found:', user);
        done(null, user);
    } catch (error) {
        console.error('Error Deserializing User:', error);
        done(error, null);
    }
});

