const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1); // pending => resolved, fulfilled
    reject(new Error("Promise rejected")); // pending => rejected
  }, 500);
});

promise.then(result => console.log(result)).catch(err => console.log(err));
