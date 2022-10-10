# What is Helmet.js & Why it is a Security Best Practice For Express.js

If you’ve ever delved into Node.js, then there’s a high chance that you’ll also encounter Express.js — a minimalist web framework built to create Node.js web applications. It comes with HTTP utilities for rapidly developing APIs and provides the foundations of other major and popular Node.js frameworks such as Feathers, LoopBack, Blueprint, and Nest.js.
 
While Express is generally robust for assisting your full stack application builds and prototypes, it is not perfect when it comes to security. The reason for this is because Express is designed for creating web applications — not securing your Node.js server from vulnerabilities. The defaults leave the HTTP headers mostly open, in part, to assist with the rapid application development. This is where Helmet.js steps in.
 
Helmet.js fills in the gap between Node.js and Express.js by securing HTTP headers that are returned by your Express apps. HTTP, by design, is open in nature and highly insecure. It can leak sensitive information about your app and leave your data open to anyone with some tech skills to see.
 
In short, using the preset default HTTP headers is a sure way to quickly get your app and running, but at the potential cost of anyone having access to it in a malicious way. What makes it worse is that because end users tend to be uneducated over the importance of HTTPS over HTTP, developers tend to ignore it unless otherwise forced to use HTTPS by their security policies.
 
In this article, we will go over how to install Helmet.js, what the different headers are, and how to use them in Helmet.js.

# How to install Helmet.js for Express.js

To install Helmet.js for your Express.js application, use the following sequence of commands.
First, start by installing helmet.

```bash 
npm install helmet --save
```
or For Yarn 
```bash 
yarn add helmet
```

Now, include it into your app like this:
 ```javascript
const express = require('express');
const app = express();
const helmet = require('helmet')

app.use(helmet())
 ```
That’s basically it. Now you’re ready to begin configuring your API’s headers for extra added security.

# How Helmet.js works and how to use it

Helmet.js  comes with a collection of Node modules that you can use to interface to Express to increase the HTTP header security. How does it work? It lets you configure the headers and prevent common vulnerabilities such as clickjacking, implementation of strict HTTP, and download options for vulnerable browsers such as IE8.
 
When you use Helmet.js, you can also configure Content-Security-Policy to force subsequent developers working on public-facing APIs that require HTTP to approach the code with a security-first mindset.
 
Here is a list of HTTP headers supported by Helmet.js and how to use them.
 

# Content-Security-Policy
helmet.contentSecurityPolicy(options) lets you set the Content-Security-Policy which allows you to mitigate cross-site scripting attacks. If no directive is applied by the developer, the following policy is set as the default:

```javascript
 default-src 'self';
 base-uri 'self';
 block-all-mixed-content;
 font-src 'self' https: data:;
 frame-ancestors 'self';
 img-src 'self' data:;
 object-src 'none';
 script-src 'self';
 script-src-attr 'none';
 style-src 'self' https: 'unsafe-inline';
 upgrade-insecure-requests
 ```

 Here is an example of the module in use:
 
 ```javascript
  app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "localhost"],
      "style-src": null,
    },
  })
 );
 ```
  
# Reduce Fingerprinting
It can help to provide an extra layer of obsecurity to reduce server fingerprinting. Though not a security issue itself, a method to improve the overall posture of a web server is to take measures to reduce the ability to fingerprint the software being used on the server. Server software can be fingerprinted by kwirks in how they respond to specific requests.

By default, Express.js sends the X-Powered-By response header banner. This can be disabled using the `app.disable()` method:

```javascript
app.disable('x-powered-by')
```

# Resources

[helmet.js](https://helmetjs.github.io/)