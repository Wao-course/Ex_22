# Lesson 12 exercises
We'll use Auth0 (by Okta), which is an identity provider company that is widely used by many companies around the world and across multiple industries.

Before you venture into the dungeons of the OAuth and OIDC with Auth0, it's good to know that there is a log available @ `https://manage.auth0.com/dashboard/us/<YOUR_TENANT>/logs`. That webpage gives a near real-time peek under the hood of what's going on with Auth0, so check that out when you run into trouble.

There a lot of setup on the Auth0 Dashboard, so make sure to be very thorough when following the guides on their pages.

## Exercise 12-1
Setup Client Credentials Flow with Auth0

We'll use the flow when we what to access data from a protected API without user involvement. This will often be the case when we own the protected resources we're trying to read. 

Go to https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow and read a introduction to the Client Credentials flow.

Did you read it? Good! We are now ready to get our hands dirty. Go to https://auth0.com/docs/quickstart/backend and select your favorite backend framework and follow the instructions.

Some hints to get you up to speed:
- Be sure to select 'API' under 'Applications'

## Exercise 12-2
Setup Authorization Code Flow with Auth0 

We'll use this approach if we want to access data on behalf of the user. The user is redirected to a login page that returns a code which can be exchanged for an access token. 

Read https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow to get an overview of the flow and how it used and then go ahead and set it up by following: https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow

Some hints to get you up to speed:
- Be sure to select 'Regular Web Application' under 'Applications'.

## Exercise 12-3
Setup Authorization Code Flow with Proof Key for Code Exchange (PKCE)

There are a lot of applications out there that live solely on the client side. This is introduces some challenges, and the two former grant types requires us to send `client_secret` along on the request. So what do we do where it is not possible to distribute the secret? The answer is adding a proof key for code exchange on top of the Authorization Code flow.

Go to https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce to get an introduction to Authorization Code with PKCE.

Next up is setting it up for an application. Follow the guide @ https://auth0.com/docs/get-started/authentication-and-authorization-flow/add-login-using-the-authorization-code-flow-with-pkce.

Some hints to get you up to speed:
- Be sure to select 'Native' or 'Single Page Web Application'
- If you're running TypeScript, use this code to generate code challenges and verifiers
  ```typescript
  function base64URLEncode(buffer: Buffer) {
    return buffer.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
  
  function sha256(buffer: Buffer) {
    return createHash('sha256').update(buffer).digest();
  }
  ```
- The purpose of this exercise is not to make a client application, so add an endpoint to the API you created in `Exercise 12.1`, see `Lecture 21 - OAuth 2.0 and OpenID Connect/exercises/solution-proposal/src/utils.ts` for a Node.js/Express.js solution - it should be trivial to make such an endpoint in your framework of choice


## Exercise 12-4
Add the sufficient scopes to be able to access `https://<TENANT>.<REGION>.auth0.com/userinfo`

Here are som hints:
- Check out the available scopes @ https://auth0.com/docs/get-started/apis/scopes/openid-connect-scopes
- Scopes are specified when calling the `/authorize` endpoint