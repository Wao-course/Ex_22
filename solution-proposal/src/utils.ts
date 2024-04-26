import { Router } from 'express';
import { randomBytes, createHash } from 'crypto';

const router = Router();

router.get('/challenge', (req, res) => {
  const verifier = base64URLEncode(randomBytes(32));
  const challenge = base64URLEncode(sha256(Buffer.from(verifier)));
  
  res.json({
    challenge,
    verifier
  })
})

const base64URLEncode = (buffer: Buffer) => {
  return buffer.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}

const sha256 = (buffer: Buffer) => {
  return createHash('sha256').update(buffer).digest();
}

export const utils = router;