The axios library creates a Promise() object. Promise is a built-in object in JavaScript ES6. When this object is instantiated using the new keyword, it takes a function as an argument. This single function in turn takes two arguments, each of which are also functions — resolve and reject.

Promises execute the client side code and, due to cool Javascript asynchronous flow, could eventually resolve one or two things, that resolution (generally considered to be a semantically equivalent to a Promise's success), or that rejection (widely considered to be an erroneous resolution). For instance, we can hold a reference to some Promise object which comprises a function that will eventually return a response object (that would be contained in the Promise object). So one way we could use such a promise is wait for the promise to resolve to some kind of response.

You might raise we don't want to be waiting seconds or so for our API to return a call! We want our UI to be able to do things while waiting for the API response. Failing that we would have a very slow user interface. So how do we handle this problem?

Well a Promise is asynchronous. In a standard implementation of engines responsible for executing Javascript code (such as Node, or the common browser) it will resolve in another process while we don't know in advance what the result of the promise will be. A usual strategy is to then send our functions (i.e. a React setState function for a class) to the promise, resolved depending on some kind of condition (dependent on our choice of library). This will result in our local Javascript objects being updated based on promise resolution. So instead of getters and setters (in traditional OOP) you can think of functions that you might send to your asynchronous methods.

I'll use Fetch in this example so you can try to understand what's going on in the promise and see if you can replicate my ideas within your axios code. Fetch is basically similar to axios without the innate JSON conversion, and has a different flow for resolving promises (which you should refer to the axios documentation to learn).


```javascript
const base_endpoint = BaseEndpoint + "cache/";
// Default function is going to take a selection, date, and a callback to execute.
// We're going to call the base endpoint and selection string passed to the original function.
// This will make our endpoint.
export default (selection, date, callback) => {  
  fetch(base_endpoint + selection + "/" + date) 
     // If the response is not within a 500 (according to Fetch docs) our promise object
     // will _eventually_ resolve to a response. 
    .then(res => {
      // Lets check the status of the response to make sure it's good.
      if (res.status >= 400 && res.status < 600) {
        throw new Error("Bad response");
      }
      // Let's also check the headers to make sure that the server "reckons" its serving 
      //up json
      if (!res.headers.get("content-type").includes("application/json")) {
        throw new TypeError("Response not JSON");
      }
      return res.json();
    })
    // Fulfilling these conditions lets return the data. But how do we get it out of the promise? 
    .then(data => {
      // Using the function we passed to our original function silly! Since we've error 
      // handled above, we're ready to pass the response data as a callback.
      callback(data);
    })
    // Fetch's promise will throw an error by default if the webserver returns a 500 
    // response (as notified by the response code in the HTTP header). 
    .catch(err => console.error(err));
};
```

Now we've written our GetCache method, lets see what it looks like to update a React component's state as an example...

```javascript
// Make sure you import GetCache from GetCache.js!

resolveData() {
    const { mySelection, date } = this.state; // We could also use props or pass to the function to acquire our selection and date.
    const setData = data => {
      this.setState({
        data: data,
        loading: false 
        // We could set loading to true and display a wee spinner 
        // while waiting for our response data, 
        // or rely on the local state of data being null.
      });
    };
  GetCache("mySelelection", date, setData);
  }
```

Ultimately, you don't "return" data as such, I mean you can but it's more idiomatic to change your way of thinking... Now we are sending data to asynchronous methods.

# Resources

- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise?retiredLocale=de)
- [javascript.info/promise-basics](https://javascript.info/promise-basics)
- [Axios](https://axios-http.com/de/docs/intro)
- [Axios#Promise](https://github.com/axios/axios#promises)