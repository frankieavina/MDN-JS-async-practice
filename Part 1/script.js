//-------------------------------- Intro To Async JS -------------------------/
//----------------------------------------------------------------------------/

//------------------- Synchronous Programming --------------------/
// The program below uses a very inefficient algorithm to generate 
// multiple large prime numbers when a user clicks the "Generate primes" button. 
// 
const MAX_PRIME = 1000000;
// function that is checking if number is prime
function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}
// getting a random number
const random = (max) => Math.floor(Math.random() * max);

function generatePrimes(quota) {
  const primes = [];
  while (primes.length < quota) {
    const candidate = random(MAX_PRIME);
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

const quota = document.querySelector("#quota");
const output = document.querySelector("#output");

document.querySelector("#generate").addEventListener("click", () => {
  const primes = generatePrimes(quota.value);
  output.textContent = `Finished generating ${quota.value} primes!`;
});

document.querySelector("#reload").addEventListener("click", () => {
  document.location.reload();
});

// We should note here that the browser effectively steps through the program one line at 
// a time, in the order we wrote it. At each point, the browser waits for the line to finish 
// its work before going on to the next line. It has to do this because each line depends 
// on the work done in the preceding lines.

//------------------- Event Handlers --------------------/
//Event handlers are really a form of asynchronous programming: you provide 
//a function (the event handler) that will be called, not right away, but whenever the event happens.

// The following example shows this in action. Press "Click to start request" to send a request.
//  We create a new XMLHttpRequest and listen for its loadend event. The handler logs a "Finished!" 
//  message along with the status code.
const log = document.querySelector(".event-log");

document.querySelector("#xhr").addEventListener("click", () => {
  log.textContent = "";

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("loadend", () => {
    log.textContent = `${log.textContent}Finished with status: ${xhr.status}`;
  });

  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
  );
  xhr.send();
  log.textContent = `${log.textContent}Started XHR request\n`;
});

document.querySelector("#reload").addEventListener("click", () => {
  log.textContent = "";
  document.location.reload();
});

//-------------------Callbacks --------------------/
// An event handler is a particular type of callback. A callback is just a function that's
//  passed into another function, with the expectation that the callback will be called 
//  at the appropriate time. As we just saw, callbacks used to be the main way asynchronous 
//  functions were implemented in JavaScript.

function doStep1(init, callback) {
    const result = init + 1;
    callback(result);
  }
  
  function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
  }
  
  function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
  }
  
  function doOperation() {
    doStep1(0, (result1) => {
      doStep2(result1, (result2) => {
        doStep3(result2, (result3) => {
          console.log(`result: ${result3}`);
        });
      });
    });
  }
  
  doOperation();
  

// When we nest callbacks like this, it can also get very hard to handle errors: often you have 
// to handle errors at each level of the "pyramid", instead of having error handling only once
//  at the top level.

// For these reasons, most modern asynchronous APIs don't use callbacks. Instead, the foundation
//  of asynchronous programming in JavaScript is the Promise, and that's the subject of the next article.