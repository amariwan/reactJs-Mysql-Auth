


<h1 align="center">
  🚧 ReactJs Auth with MySQL API 🚧
	<br>
</h1>

<div align="center">

Before start, you need to have the following tools installed on computer: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and/or [Yarn](https://yarnpkg.com/). [MySQl::Workbench](https://www.mysql.com/products/workbench/).

<br>
	  <a href="https://choosealicense.com/licenses/mit">
		<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
	</a>
	<img src="https://img.shields.io/github/checks-status/amariwan/reactJs-Mysql-Auth/master" alt="Build Status">
	<a href="https://github.com/amariwan/reactJs-Mysql-Auth">
		<img src="https://img.shields.io/github/stars/amariwan/reactJs-Mysql-Auth?style=social">
	</a>
</div>

## Table of Contents
  * [Features](#features)
  * [Browser Support](#browser-support)
- [Quick Start](#quick-start)
  - [Installing](#installing)
  - [Creating an SSL Certificate](#creating-an-ssl-certificate)
  - [Using Environment Variables in Local Development](#using-environment-variables-in-local-development)
- [API](#api)
- [Sessions](#sessions)
    - [Flow](#flow)
    - [Features](#features-1)
- [Cookies](#cookies)
    - [Security](#security)
    - [Attributes](#attributes)
    - [Flags](#flags)
    - [CSRF](#csrf)
  - [Tokens](#tokens)
    - [Flow](#flow-1)
    - [Features](#features-2)
  - [JWT (JSON Web Tokens)](#jwt-json-web-tokens)
    - [Security](#security-1)
    - [XSS](#xss)
- [Client Storage](#client-storage)
    - [`localStorage`](#localstorage)
      - [Pros](#pros)
      - [Cons](#cons)
      - [Best for](#best-for)
      - [Worst for](#worst-for)
- [Sessions vs. JWT](#sessions-vs-jwt)
    - [Sessions + Cookies](#sessions--cookies)
      - [Pros](#pros-1)
      - [Cons](#cons-1)
    - [JWT Auth](#jwt-auth)
      - [Pros](#pros-2)
      - [Cons](#cons-2)
- [Options for Auth in SPAs / APIs](#options-for-auth-in-spas--apis)
    - [Stateless JWT](#stateless-jwt)
    - [Stateful JWT](#stateful-jwt)
    - [Sessions](#sessions-1)
    - [Verdict](#verdict)
- [Why not JWT?](#why-not-jwt)
    - [Important](#important)
    - [Auxiliary measures](#auxiliary-measures)
- [How to encrypt and decrypt in nodejs](#how-to-encrypt-and-decrypt-in-nodejs)
  - [1. Hash functions with Bcrypt (one-way)](#1-hash-functions-with-bcrypt-one-way)
- [2. Simple Encryption and Decryption (two-way)](#2-simple-encryption-and-decryption-two-way)
- [errorcodes messages 🦠](#errorcodes-messages-)
- [Libraries used 🚀](#libraries-used-)
    - [Frontend:](#frontend)
    - [Backend:](#backend)
- [License](#license)


## Features


The Stack:

 React + Express + Axios .

1. React Scaffolding
1. React-router
1. Postgres
1. NodeJS Express web server  

Security:

1. Username and Password Sign-in and Sign-up
1. HelmetJS for header protection mechanisms
1. TLS/SSL By default
1. XSS protections
1. CSRF protections
1. Secure sessions

## Browser Support

Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png" alt="Vivaldi" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Vivaldi | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE9, IE11, Edge                                                                                                                                                                                                 | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                                       |




# Quick Start 

## Installing
Install backend and Frontend by running either of the following:
> Install NodeJS LTS from NodeJs Official Page (NOTE: Product only works with LTS version)

Clone the repository with the following command:
```bash
https://github.com/amariwan/reactJs-Mysql-Auth.git
```
Run in terminal this command:
```bash
cd backend && npm i && cd ../Frontend/ && npm i 
```
## Creating an SSL Certificate

1. First, generate a key file used for self-signed certificate generation with the command below. The command will create a private key as a file called key.pem.
  
```bash
openssl genrsa -out key.pem
```

2. Next, generate a certificate service request (CSR) with the command below. You’ll need a CSR to provide all of the input necessary to create the actual certificate.

```bash
openssl req -new -key key.pem -out csr.pem
```
<img src="./src/img/openssl_1.png" alt="openssl_1">

3. Finally, generate your certificate by providing the private key created to sign it with the public key created in step two with an expiry date of 9,999 days. This command below will create a certificate called cert.pem.
```bash
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
```
## Using Environment Variables in Local Development

Create a file called .env in the root of your project, and then add all the environment variables you need into this using the following format:
```bash
cp -r env .env
```
info about .env variable

```env
host                    =   ""  // Host name for database connection. //! localhost
user                    =   ""  // Database user. //! root
password                =   ""  // Password for the above database user. 
port                    =   ""  // Port number for database connection. //! 3306
database                =   ""  // Database name. //! auth_db
SERVERPORT              =   ""  // Server port //! 4000
SESSION_SECRET          =   ""  // Session secret //! Harley Davidson
algorithm               =   ""  // Algorithm used to generate the encryption //! aes-256-ctr
secretKey               =   ""  // Secret key for the above encryption  //! vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3
viByte                  =   ""  // Encryption key for the above encryption //! 16
OriginFrontendServer    =   ""  //frontend server //! localhost:8080
```
Then run this command to start your local server
```bash
npm start 
```
or
```bash
npm start
```
----
# API
Server will listen on port `yourServerPort`, and it expose the following APIs:


- **POST** - `/auth/register` - Register a new user
  - **name** - *string*
  - **lastname** - *string*
  - **username** - *string*
  - **email** - *string*
  - **password** - *string*

- **POST** - `/auth/login` - Login user
  - **email** - *string* or **username** - *string*
  - **password** - *string*

# Sessions

### Flow

- user submits login _credentials_, e.g. email & password
- server verifies the credentials against the DB
- server creates a temporary user **session**
- sever issues a cookie with a **session ID**
- user sends the cookie with each request
- server validates it against the session store & grants access
- when user logs out, server destroys the sess. & clears the cookie

### Features

- every user session is stored server-side (**stateful**)
  - memory (e.g. file system)
  - cache (e.g. `Redis` or `Memcached`), or
  - DB (e.g. `Postgres`, `MongoDB`, `MySQL`)
- each user is identified by a session ID
  - **opaque** ref.
    - no 3rd party can extract data out
    - only issuer (server) can map back to data
  - stored in a cookie
    - signed with a secret
    - protected with flags
- SSR web apps, frameworks (`Spring`, `Rails`), scripting langs (`PHP`)

# Cookies

- `Cookie` header, just like `Authorization` or `Content-Type`
- used in session management, personalization, tracking
- consists of *name*, *value*, and (optional) *attributes* / *flags*
- set with `Set-Cookie` by server, appended with `Cookie` by browser

```bash
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: SESS_ID=9vKnWqiZvuvVsIV1zmzJQeYUgINqXYeS; Domain=example.com; Path=/
```

### Security

- signed (`HMAC`) with a secret to mitigate tampering
- *rarely* encrypted (`AES`) to protected from being read
  - no security concern if read by 3rd party
  - carries no meaningful data (random string)
  - even if encrypted, still a 1-1 match
- encoded (`URL`) - not for security, but compat


### Attributes

- `Domain` and `Path` (can only be used on a given site & route)
- `Expiration` (can only be used until expiry)
  - when omitted, becomes a *session cookie*
  - gets deleted when browser is closed

### Flags

- `HttpOnly` (cannot be read with JS on the client-side)
- `Secure` (can only sent over encrypted `HTTPS` channel), and
- `SameSite` (can only be sent from the same domain, i.e. no CORS sharing)

### CSRF

- unauthorized actions on behalf of the authenticated user
- mitigated with a CSRF token (e.g. sent in a separate `X-CSRF-TOKEN` cookie)

## Tokens

### Flow

- user submits login _credentials_, e.g. email & password
- server verifies the credentials against the DB
- sever generates a temporary **token** and embeds user data into it
- server responds back with the token (in body or header)
- user stores the token in client storage
- user sends the token along with each request
- server verifies the token & grants access
- when user logs out, token is cleared from client storage

### Features

- tokens are _not_ stored server-side, only on the client (**stateless**)
- _signed_ with a secret against tampering
  - verified and can be trusted by the server
- tokens can be *opaque* or *self-contained*
  - carries all required user data in its payload
  - reduces database lookups, but exposes data to XSS
- typically sent in `Authorization` header
- when a token is about to expire, it can be _refreshed_
  - client is issued both access & refresh tokens
- used in SPA web apps, web APIs, mobile apps
## JWT (JSON Web Tokens)

- open standard for authorization & info exchange
- *compact*, *self-contained*, *URL-safe* tokens
- signed with *symmetric* (secret) or *asymmetric* (public/private) key

```bash
HTTP/1.1 200 OK
Content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmQ2MWFhMWJiNDNmNzI0M2EyOTMxNmQiLCJuYW1lIjoiSm9obiBTbWl0aCIsImlhdCI6MTU0MTI3NjA2MH0.WDKey8WGO6LENkHWJRy8S0QOCbdGwFFoH5XCAR49g4k
```

- contains **header** (meta), **payload** (claims), and **signature** delimited by `.`

```javascript
atob('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
// "{"alg":"HS256","typ":"JWT"}"
//     ↑ algorithm   ↑ type

atob('eyJzdWIiOiI1YmQ2MWFhMWJiNDNmNzI0M2EyOTMxNmQiLCJuYW1lIjoiSm9obiBTbWl0aCIsImlhdCI6MTU0MTI3NjA2MH0')
// "{"sub":"5bd61aa1bb43f7243a29316d","name":"John Smith","iat":1541276060}"
//     ↑ subject (e.g. user ID)         ↑ claim(s)		    ↑ issued at (in seconds)
```

### Security

- signed (`HMAC`) with a secret
  - guarantees that token was not tampered
  - any manipulation (e.g. exp. time) invalidates token
- *rarely* encrypted (`JWE`)
  - (web) clients need to read token payload
  - can't store the secret in client storage securely
- encoded (`Base64Url`) - not for security, but transport
  - payload can be decoded and read
  - no sensitive/private info should be stored
  - access tokens should be short-lived

### XSS

- client-side script injections
- malicious code can access client storage to
  - steal user data from the token
  - initiate AJAX requests on behalf of user
- mitigated by sanitizing & escaping user input

# Client Storage

- JWT can be stored in client storage, `localStorage` or `sessionStorage`

  - `localStorage` has no expiration time
  - `sessionStorage` gets cleared when page is closed

### `localStorage`

Browser key-value store with a simple JS API

#### Pros

- domain-specific, each site has its own, other sites can't read/write
- max size higher than cookie (`5 MB` / domain vs. `4 KB` / cookie)

#### Cons

- plaintext, hence not secure by design
- limited to string data, hence need to serialize
- can't be used by web workers
- stored permanently, unless removed explicitly
- accessible to any JS code running on the page (incl. XSS)
  - scripts can steal tokens or impersonate users

#### Best for

- public, non-sensitive, string data

#### Worst for

- private sensitive data
- non-string data
- offline capabilities

# Sessions vs. JWT

### Sessions + Cookies

#### Pros

- session IDs are opaque and carry no meaningful data
- cookies can be secured with flags (same origin, HTTP-only, HTTPS, etc.)
- HTTP-only cookies can't be compromised with XSS exploits
- battle-tested 20+ years in many langs & frameworks

#### Cons

- server must store each user session in memory
- session auth must be secured against CSRF
- horizontal scaling is more challenging
  - risk of single point of failure
  - need sticky sessions with load balancing

### JWT Auth

#### Pros

- server does not need to keep track of user sessions
- horizontal scaling is easier (any server can verify the token)
- CORS is not an issue if `Authorization` header is used instead of `Cookie`
- FE and BE architecture is decoupled, can be used with mobile apps
- operational even if cookies are disabled

#### Cons

- server still has to maintain a blacklist of revoked tokens
  - defeats the purpose of stateless tokens
  - a whitelist of active user sessions is more secure
- when scaling, the secret must be shared between servers
- data stored in token is "cached" and can go *stale* (out of sync)
- tokens stored in client storage are vulnerable to XSS
  - if JWT token is compromised, attacker can
    - steal user info, permissions, metadata, etc.
    - access website resources on user's behalf
- requires JavaScript to be enabled

# Options for Auth in SPAs / APIs

1. Sessions
2. Stateless JWT
3. Stateful JWT

### Stateless JWT

- user payload embedded in the token
- token is signed & `base64url` encoded
  - sent via `Authorization` header
  - stored in `localStorage` / `sessionStorage` (in plaintext)
- server retrieves user info from the token
- no user sessions are stored server side
- only revoked tokens are persisted
- refresh token sent to renew the access token

### Stateful JWT

- only user ref (e.g. ID) embedded in the token
- token is signed & `base64url` encoded
  - sent as an HTTP-only cookie (`Set-Cookie` header)
  - sent along with non-HTTP `X-CSRF-TOKEN` cookie
- server uses ref. (ID) in the token to retrieve user from the DB
- no user sessions stored on the server either
- revoked tokens still have to be persisted

### Sessions

- sessions are persisted server-side and linked by sess. ID
- session ID is signed and stored in a cookie
  - sent via `Set-Cookie` header
  - `HttpOnly`, `Secure`, & `SameSite` flags
  - scoped to the origin with `Domain` & `Path` attrs
- another cookie can hold CSRF token

### Verdict

Sessions are (probably) better suited for web apps and websites.

# Why not JWT?

- server state needs to be maintained either way
- sessions are easily extended or invalidated
- data is secured server side & doesn't leak through XSS
- CSRF is easier to mitigate than XSS (still a concern)
- data never goes stale (always in sync with DB)
- sessions are generally easier to set up & manage
- most apps/sites don't require enterprise scaling

### Important

Regardless of auth mechanism

- XSS can compromise user accounts
  - by leaking tokens from `localStorage`
  - via AJAX requests with user token in `Authorization`
  - via AJAX requests with `HttpOnly` cookies
- SSL/HTTPS must be configured
- security headers must be set

### Auxiliary measures

- IP verification
- user agent verification
- two-factor auth
- API throttling



---------
# How to encrypt and decrypt in nodejs

In my projects I essentially find useful two ways to encrypt strings: hash functions one-way and one-way and encryption-decryption two-way :

## 1. Hash functions with Bcrypt (one-way)

Hash functions are essentials for store encrypted password, and the best library for nodejs is Bcrypt. You can find more information in this article: why use Bcrypt?.

Install: 
```bash 
npm install bcrypt
```
To hash a password:
```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'myPassword';

bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
	// Store hash in your password DB.
});
```
At user login to compare password with the one stored in the db you can use:
```javascript
bcrypt.compare(plaintextPassToCheck, hashStoredInDB).then(function(res) {
  // res == true/false
});
```
More info: github.com/kelektiv/node.bcrypt.js

# 2. Simple Encryption and Decryption (two-way)

In other scenarios I needed to crypt strings in order to hide texts to users but in a way that allows me to decrypt and retrieve the original content. In this case a fast tool is Crypto.

Install:

```bash 
npm install crypto
```
To encrypt and decrypt a string:

```javascript
var crypto = require('crypto');

var cypherKey = "mySecretKey";

function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc', cypherKey)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted; //94grt976c099df25794bf9ccb85bea72
}

function decrypt(text){
  var decipher = crypto.createDecipher('aes-256-cbc',cypherKey)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec; //myPlainText
}
```



---
# errorcodes messages 🦠

A table that shows the error codes and their respective messages.
| code  | Msg  |
| :------------ |:---------------|
| 100 | username or Email already registered|
| 101 | Invalid email|
| 102 | Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.|
| 103 | Invalid email|
| 104 | Not registered user!|
| 105 | Email or password incorrect|
| 106 | User successfully registered|

#  Libraries used 🚀

###  Frontend: 
* [react](https://reactjs.org/)
* [react-dom](https://www.npmjs.com/package/react-dom)
* [react-hot-toast](https://www.npmjs.com/package/react-hot-toast)
* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
* [crypto-js](https://www.npmjs.com/package/crypto-js)


###  Backend: 
* [express](https://www.npmjs.com/package/express)
* [express-session](https://www.npmjs.com/package/express-session)
* [cors](https://www.npmjs.com/package/cors)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [mysql](https://www.npmjs.com/package/mysql)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [cors](https://www.npmjs.com/package/cors)
* [Formik](https://www.npmjs.com/package/formik)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [crypto](https://www.npmjs.com/package/crypto)


# License
Licensed under the MIT license.
