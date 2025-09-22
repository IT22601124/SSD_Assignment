let oidcClientPromise;
let Issuer, generators;

/**
 * Initialize the openid-client module
 */
async function initOIDC() {
  if (!Issuer) {
    const oidcModule = await import('openid-client');
    Issuer = oidcModule.Issuer;
    generators = oidcModule.generators;
  }
}

/**
 * Lazily discover Google's OIDC config and create a client once.
 */
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

    // PKCE + state + nonce
    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);
    const state = generators.random();
    const nonce = generators.random();

    // Store in session
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
  } catch (err) {
    next(err);
  }
};

exports.handleCallback = async (req, res, next) => {
  try {
    await initOIDC();
    const client = await getClient();

    const { code, state } = req.query;

    // State validation
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

    // Create app session
    req.session.user = {
      sub: claims.sub,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture
    };

    // Clean up session
    delete req.session.codeVerifier;
    delete req.session.state;
    delete req.session.nonce;

    res.redirect('http://localhost:3000/');
  } catch (err) {
    next(err);
  }
};

exports.loginSuccess = (req, res) => {
  if (req.session.user) {
    res.json({
      success: true,
      message: 'Login successful',
      user: req.session.user
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
    res.clearCookie('sid');
    res.redirect('http://localhost:3000/');
  });
};

exports.getProfile = (req, res) => {
  if (req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user
    });
  } else {
    res.status(401).json({
      authenticated: false,
      message: 'Not logged in'
    });
  }
};
