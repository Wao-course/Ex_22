import { Router } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const router = Router();
const config = {
  audience: 'swwao-f23',
  issuerBaseURL: 'https://dev-zgwgflgs.us.auth0.com/'
}
const checkJwt = auth(config)

router.use(checkJwt);

router.get('', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  })
})

export const authed = router;
