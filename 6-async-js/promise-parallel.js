// Parallel promises

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async Operation 1...");
    resolve({ promise: 1 });
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async Operation 2...");
    resolve({ promise: 2 });
    // reject(new Error("Rejected promise"));
  }, 1000);
});

// Executes all passed promises in parallel.
// It's considered settled when ALL promises are settled
Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log("Error:", err.message));

// Executes all passed promises in parallel.
// It's considered settled when the FIRST promise is settled
Promise.race([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log("Error:", err.message));
