//-------------------------------- How to use promises -------------------------/
//----------------------------------------------------------------------------/
// A promise is an object returned by an asynchronous function, which represents the current 
// state of the operation. At the time the promise is returned to the caller, the operation 
// often isn't finished, but the promise object provides methods to handle the eventual 
// success or failure of the operation.


//------------------- Using the fetch() API--------------------/
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  console.log(fetchPromise);
  
  fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
  });
  
  console.log("Started request…");

// 1. calling the fetch() API, and assigning the return value to the fetchPromise variable
// 2. immediately after, logging the fetchPromise variable. This should output something 
//     like: Promise { <state>: "pending" }, telling us that we have a Promise object, and it 
//     has a state whose value is "pending". The "pending" state means that the fetch operation 
//     is still going on.
// 3. passing a handler function into the Promise's then() method. When (and if) the fetch
//     operation succeeds, the promise will call our handler, passing in a Response object, 
//     which contains the server's response.
// 4. logging a message that we have started the request.

//------------------- chaining promises --------------------/
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  fetchPromise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data[0].name);
    });

//------------------- catching errors --------------------/
// If you add catch() to the end of a promise chain, then it will be called when any of the asynchronous 
// function calls fail. So you can implement an operation as several consecutive asynchronous function calls, 
// and have a single place to handle all errors.

const fetchPromise = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  
  fetchPromise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data[0].name);
    })
    .catch((error) => {
      console.error(`Could not get products: ${error}`);
    });

//------------------- combining multiple promises --------------------/
const fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
  );
  const fetchPromise3 = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  );
  
  Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((responses) => {
      for (const response of responses) {
        console.log(`${response.url}: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Failed to fetch: ${error}`);
    });

//------------------- async and await --------------------/
// Inside an async function, you can use the await keyword before a call to a function that returns a promise. 
// This makes the code wait at that point until the promise is settled, at which point the fulfilled value of 
// the promise is treated as a return value, or the rejected value is thrown.
async function fetchProducts() {
    try {
      // after this line, our function will wait for the `fetch()` call to be settled
      // the `fetch()` call will either return a Response or throw an error
      const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // after this line, our function will wait for the `response.json()` call to be settled
      // the `response.json()` call will either return the parsed JSON object or throw an error
      const data = await response.json();
      console.log(data[0].name);
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
  
  fetchProducts();