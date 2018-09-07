// Resolved promise
const pResolved = Promise.resolve({ id: 1 });
pResolved.then(result => console.log(result));

// Rejected promise
const pRejected = Promise.reject(new Error("Error!"));
pRejected.catch(err => console.log(err));
