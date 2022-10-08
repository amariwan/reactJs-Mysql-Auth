These are separate concepts:

Cookie - Browser sends this with every request automatically
Header - Part of a HTTP request, the browser will only send data here if instructed.
Access token - Contains secret which may be a JWT (and identify the user) or a random set of characters
Session - a token bound to a user + device that authenticates the user. If the user doesn't have an access token, they can use the session to get a new token.
You can see that Cookie/Header are the where and access token/session token are the what.

The user needs to authenticate in your service. That means you need to be able to identify the user. That may be done with a JWT, session token, IP address, a signature, etc... And that is separate from how this data is transmitted to the service from the user.

So when you say why do you I need session when the user has cookies, these are totally unrelated. The session id may be saved in a cookie, that's just one option.

Whether or not the session id in a cookie corresponds to actual data on the server side is another completely separate question. Should the session token be a encrypted (or signed) object, like a JWT which contains user identifying information, or should that data be saved in a server side DB, and only transmit a random-string identifier. Who knows?

The answer is going to be based on what's critical for your application. Generally speaking, session tracking on the server side is a legacy concept, and the new hotness (which is old now), is to make the sessionId a JWT saved a HTTP Only cookie for security. And then passed on every request.

Lot's of services have sessions and access token management baked in, and for a working example and more about tokens, check out [any one of many knowledge bases](https://authress.io/knowledge-base/).

[##](https://stackoverflow.com/questions/50405628/why-do-we-need-session-when-we-already-have-cookies#:~:text=It%20is%20preferred%20to%20use,play%20requests%20to%20your%20site.)