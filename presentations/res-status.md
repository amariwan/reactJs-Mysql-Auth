res.sendStatus(statusCode)
// Sets the response HTTP status code to statusCode and send its string representation as the response body.

res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')

//If an unsupported status code is specified, the HTTP status is still set to statusCode and the string version of the code is sent as the response body.

res.sendStatus(2000); // equivalent to res.status(2000).send('2000')

# dump of methods list at the time of creating readme

| `res[method]` | Code |  Desc/reason phrase |
|---------------|------|-------|
|  res.continue(); | 100 |Continue |
|  res.switchingProtocols(); | 101 |Switching Protocols |
|  res.processing(); | 102 |Processing |
|  res.ok(); | 200 |OK |
|  res.created(); | 201 |Created |
|  res.accepted(); | 202 |Accepted |
|  res.nonAuthoritativeInformation(); | 203 |Non-Authoritative Information |
|  res.noContent(); | 204 |No Content |
|  res.resetContent(); | 205 |Reset Content |
|  res.partialContent(); | 206 |Partial Content |
|  res.multiStatus(); | 207 |Multi-Status |
|  res.alreadyReported(); | 208 |Already Reported |
|  res.imUsed(); | 226 |IM Used |
|  res.multipleChoices(); | 300 |Multiple Choices |
|  res.movedPermanently(); | 301 |Moved Permanently |
|  res.found(); | 302 |Found |
|  res.seeOther(); | 303 |See Other |
|  res.notModified(); | 304 |Not Modified |
|  res.useProxy(); | 305 |Use Proxy |
|  res.temporaryRedirect(); | 307 |Temporary Redirect |
|  res.permanentRedirect(); | 308 |Permanent Redirect |
|  res.badRequest(); | 400 |Bad Request |
|  res.unauthorized(); | 401 |Unauthorized |
|  res.paymentRequired(); | 402 |Payment Required |
|  res.forbidden(); | 403 |Forbidden |
|  res.notFound(); | 404 |Not Found |
|  res.methodNotAllowed(); | 405 |Method Not Allowed |
|  res.notAcceptable(); | 406 |Not Acceptable |
|  res.proxyAuthenticationRequired(); | 407 |Proxy Authentication Required |
|  res.requestTimeout(); | 408 |Request Timeout |
|  res.conflict(); | 409 |Conflict |
|  res.gone(); | 410 |Gone |
|  res.lengthRequired(); | 411 |Length Required |
|  res.preconditionFailed(); | 412 |Precondition Failed |
|  res.payloadTooLarge(); | 413 |Payload Too Large |
|  res.uriTooLong(); | 414 |URI Too Long |
|  res.unsupportedMediaType(); | 415 |Unsupported Media Type |
|  res.rangeNotSatisfiable(); | 416 |Range Not Satisfiable |
|  res.expectationFailed(); | 417 |Expectation Failed |
|  res.imATeapot(); | 418 |I\'m a teapot |
|  res.misdirectedRequest(); | 421 |Misdirected Request |
|  res.unprocessableEntity(); | 422 |Unprocessable Entity |
|  res.locked(); | 423 |Locked |
|  res.failedDependency(); | 424 |Failed Dependency |
|  res.unorderedCollection(); | 425 |Unordered Collection |
|  res.upgradeRequired(); | 426 |Upgrade Required |
|  res.preconditionRequired(); | 428 |Precondition Required |
|  res.tooManyRequests(); | 429 |Too Many Requests |
|  res.requestHeaderFieldsTooLarge(); | 431 |Request Header Fields Too Large |
|  res.unavailableForLegalReasons(); | 451 |Unavailable For Legal Reasons |
|  res.internalServerError(); | 500 |Internal Server Error |
|  res.notImplemented(); | 501 |Not Implemented |
|  res.badGateway(); | 502 |Bad Gateway |
|  res.serviceUnavailable(); | 503 |Service Unavailable |
|  res.gatewayTimeout(); | 504 |Gateway Timeout |
|  res.httpVersionNotSupported(); | 505 |HTTP Version Not Supported |
|  res.variantAlsoNegotiates(); | 506 |Variant Also Negotiates |
|  res.insufficientStorage(); | 507 |Insufficient Storage |
|  res.loopDetected(); | 508 |Loop Detected |
|  res.bandwidthLimitExceeded(); | 509 |Bandwidth Limit Exceeded |
|  res.notExtended(); | 510 |Not Extended |
|  res.networkAuthenticationRequired(); | 511 |Network Authentication Required |


# Resources

- [express-res-status](https://www.npmjs.com/package/express-res-status)