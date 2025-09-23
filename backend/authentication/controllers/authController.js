let oidcClientPromise;
let Issuer, generators;
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const tempAuthResults = new Map();

async function initOIDC() {
  if (!Issuer) {
    const oidcModule = await import('openid-client');
    Issuer = oidcModule.Issuer;
    generators = oidcModule.generators;
  }
}
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

async function getClient() {
  if (!oidcClientPromise) {
    oidcClientPromise = (async () => {
      await initOIDC();
      const google = await Issuer.discover('https://accounts.google.com');
      return new google.Client({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: [`${process.env.BASE_URL}/auth/callback`],
        response_types: ['code']
      });
    })();
  }
  return oidcClientPromise;
}

exports.startLogin = async (req, res, next) => {
  try {
    await initOIDC();
    const client = await getClient();
    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);
    const state = generators.random();
    const nonce = generators.random();

    req.session.codeVerifier = codeVerifier;
    req.session.state = state;
    req.session.nonce = nonce;

    const authUrl = client.authorizationUrl({
      scope: 'openid email profile',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state,
      nonce
    });
    res.redirect(authUrl);
  } catch (err) { next(err); }
};

exports.handleCallback = async (req, res, next) => {
  try {
    await initOIDC();
    const client = await getClient();

    const { code, state } = req.query;

    if (!state || state !== req.session.state) {
      return res.status(400).send('Invalid state');
    }

    const params = { code, state };
    const tokenSet = await client.callback(
      `${process.env.BASE_URL}/auth/callback`,
      params,
      {
        code_verifier: req.session.codeVerifier,
        state: req.session.state,
        nonce: req.session.nonce
      }
    );

    const claims = tokenSet.claims();
    const userInfo = await client.userinfo(tokenSet);

    const googleProfile = {
      sub: claims.sub,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture
    };

    const result = await User.googleAuth(googleProfile);
    
    if (result.isNewUser && !result.user.profileComplete) {
        req.session.pendingUser = {
            _id: result.user._id,
            email: result.user.email,
            firstname: result.user.firstname,
            lastname: result.user.lastname,
            picture: result.user.picture,
            isGoogleUser: result.user.isGoogleUser,
            needsProfileCompletion: true
        };

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.redirect('http://localhost:3000/login?error=session_save_failed');
            }
            res.redirect('http://localhost:3000/complete-profile');
        });
        return;
    }
  
    const token = createToken(result.user._id);
    const authKey = generators.random();
  
    tempAuthResults.set(authKey, {
      user: {
        _id: result.user._id,
        email: result.user.email,
        firstname: result.user.firstname,
        lastname: result.user.lastname,
        type: result.user.type,
        picture: result.user.picture,
        isGoogleUser: result.user.isGoogleUser,
        token
      },
      timestamp: Date.now()
    });
    setTimeout(() => {
      tempAuthResults.delete(authKey);
    }, 5 * 60 * 1000); 
    req.session.user = {
      _id: result.user._id,
      email: result.user.email,
      firstname: result.user.firstname,
      lastname: result.user.lastname,
      type: result.user.type,
      picture: result.user.picture,
      isGoogleUser: result.user.isGoogleUser,
      token
    };
    req.session.googleAuthSuccess = true;
    req.session.authTimestamp = Date.now();
    delete req.session.codeVerifier;
    delete req.session.state;
    delete req.session.nonce;

    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.redirect('http://localhost:3000/login?error=session_save_failed');
      }
      console.log('Session saved successfully, user:', req.session.user);
      res.redirect(`http://localhost:3000/auth/callback?auth=success&key=${authKey}&sid=${req.sessionID}`);
    });
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.redirect('http://localhost:3000/login?error=oauth_failed');
  }
};

exports.loginSuccess = (req, res) => {
  if (req.session.user) {
    res.json({
      success: true,
      message: 'Login successful',
      user: req.session.user,
      token: req.session.user.token
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid'); 
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
};

exports.getProfile = (req, res) => {
  console.log('getProfile called');
  console.log('Session ID:', req.sessionID);
  console.log('Session user:', req.session.user);
  console.log('Google auth success flag:', req.session.googleAuthSuccess);
  console.log('Auth timestamp:', req.session.authTimestamp);
  console.log('Full session:', req.session);
  console.log('Request headers:', req.headers);
  
  if (req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user
    });
  } else {
    res.status(401).json({
      authenticated: false,
      message: 'Not logged in',
      sessionID: req.sessionID,
      hasGoogleAuthSuccess: !!req.session.googleAuthSuccess,
      sessionKeys: Object.keys(req.session)
    });
  }
};

exports.testSession = (req, res) => {
  if (!req.session.views) {
    req.session.views = 0;
  }
  req.session.views++;
  
  res.json({
    sessionID: req.sessionID,
    views: req.session.views,
    hasUser: !!req.session.user,
    sessionData: req.session
  });
};
exports.getPendingUser = (req, res) => {
  if (req.session.pendingUser) {
    res.json({
      success: true,
      user: req.session.pendingUser
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'No pending user found'
    });
  }
};

exports.completeProfile = async (req, res) => {
  try {
    if (!req.session.pendingUser) {
      return res.status(400).json({
        success: false,
        error: 'No pending user found'
      });
    }

    const { firstname, lastname, mobilenumber, type } = req.body;
    const userId = req.session.pendingUser._id;

    const user = await User.completeGoogleProfile(userId, {
      firstname,
      lastname,
      mobilenumber,
      type
    });

    const token = createToken(user._id);

    req.session.user = {
      _id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      type: user.type,
      picture: user.picture,
      isGoogleUser: user.isGoogleUser,
      token
    };

    delete req.session.pendingUser;

    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Session save failed' });
      }

      res.json({
        success: true,
        user: req.session.user,
        token
      });
    });

  } catch (error) {
    console.error('Profile completion error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
exports.getAuthResult = (req, res) => {
  const { key } = req.params;
  const result = tempAuthResults.get(key);
  
  if (result) {
    if (Date.now() - result.timestamp < 5 * 60 * 1000) {
      tempAuthResults.delete(key);
      res.json({
        authenticated: true,
        user: result.user
      });
    } else {
      tempAuthResults.delete(key);
      res.status(401).json({
        authenticated: false,
        message: 'Auth key expired'
      });
    }
  } else {
    res.status(401).json({
      authenticated: false,
      message: 'Invalid auth key'
    });
  }
};
