import express from 'express';
import * as dotenv from 'dotenv';
import { auth, requiresAuth } from 'express-openid-connect';

import { authed } from './authed';
import { utils } from './utils';

dotenv.config();

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use('/utils', utils)
app.get('/callback', (req, res) => {
  const { code } = req.query
  res.json({ code })
})

app.use(auth(config));

app.use('/authed', authed);

app.get('', (req, res) => {
  res.json(req.oidc.isAuthenticated() ? { logged_in: true } : { logged_in: false })
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.json(req.oidc.user);
});

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
