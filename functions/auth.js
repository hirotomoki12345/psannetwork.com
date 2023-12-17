// functions/auth.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// セッションの設定
app.use(require('express-session')({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Passportの初期化とセッションの設定
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth 2.0の設定
passport.use(new GoogleStrategy({
    clientID: '469637175846-8974sb0cb2c7bt7u03tcdvsmuge40oeb.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/.netlify/functions/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
    // ユーザー情報がprofileに格納されるので、ここでデータベースに保存などの処理を行うことができます。
    return done(null, profile);
}));

// ユーザーシリアライズとデシリアライズ
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// ログインエンドポイント
app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

// コールバックエンドポイント
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

// ログアウトエンドポイント
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Netlify Functionのエクスポート
module.exports.handler = (event, context) => {
    const server = app.listen(context.port, () => {
        const { port } = server.address();
        console.log(`Server is running on port ${port}`);
    });
};
