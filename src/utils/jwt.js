const config = require('config');
const jwt = require('jsonwebtoken');

const Token = require('../accounts/models/token');

const generateToken = (payload, secrets) => {
  const opts = {
    expiresIn: secrets.expirationTime,
  };
  return jwt.sign(payload, secrets.secret, opts);
};

const generateAuthTokens = async (payload, user) => {
  const accessToken = generateToken({
    ...payload,
    type: 'access',
  }, config.get('jwtSecret').accessToken);

  const refreshTokenID = new mongoose.Types.ObjectId();
  const refreshToken = generateToken({
    _id: refreshTokenID,
    // eslint-disable-next-line no-underscore-dangle
    userID: user._id,
    type: 'refresh',
  }, config.get('jwtSecret').refreshToken);
  const refreshTokenFingerprint = new Token({ _id: refreshTokenID, user });
  await refreshTokenFingerprint.save();

  return {
    accessToken,
    refreshToken,
  };
};

const verifyToken = (token, secret) => jwt.verify(token.replace(/JWT/, '').trim(), secret);

module.exports = {
  generateToken,
  generateAuthTokens,
  verifyToken,
};

// 
// const LocalStrategy = require('passport-local');
// const jwt = require('jwt-simple');

// const { UserDB } = require('../models/UserDB');

// const opts = {
//   usernameField: 'email',
//   passwordField: 'pass',
//   passReqToCallback: true,
//   session: false,
// };

// module.exports = new LocalStrategy(opts, async (req, email, password, done) => {
//   UserDB.checkPassword(email, password)
//     .then((checkPasswordResponse) => {
//       if (!checkPasswordResponse.flag) {
//         return done({ message: checkPasswordResponse.message }, false);
//       }
// console.log("user"+user);
//       const { user } = checkPasswordResponse;

//       const accessTokenPayload = {
//         id: user.id,
//         expiresIn: new Date().setTime(new Date().getTime() + 200000),
//       };

//       const refreshTokenPayload = {
//         email: email,
//         expiresIn: new Date().setTime(new Date().getTime() + 1000000),
//       };

//       const accessToken = jwt.encode(accessTokenPayload, 'super_secret');
//       const refreshToken = jwt.encode(refreshTokenPayload, 'super_secret_refresh');

//       user.tokens = { accessToken, refreshToken };

//       return done(null, user);
//     })
//     .catch((err) => done({ message: err.message }, false));
// });