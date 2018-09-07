// getCustomer(1, customer => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies(movies => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

(async () => {
  try {
    const customer = await getCustomer(1);
    console.log("Customer:", customer);

    if (customer.isGold) {
      const topMovies = await getTopMovies();
      console.log("Top movies:", topMovies);

      const email = await sendEmail(customer.email, topMovies);
      console.log("Email sent...");
    }
  } catch (err) {
    console.log(err);
  }
})();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    console.log("Fetching customer data...");

    setTimeout(() => {
      resolve({
        id: id,
        name: "Pedro Britto",
        isGold: true,
        email: "pedro.britto@gmail.com"
      });
      // reject(new Error("Couldn't fetch user info."));
    }, 1000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    console.log("Fetching top movies list...");
    const topMovies = ["The Matrix", "Interstellar", "Dunkirk"];

    setTimeout(() => {
      resolve(topMovies);
      // reject(new Error("Couln't fetch top movies list."))
    }, 1000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    console.log("Sending email with movies list...");
    const emailInfo = { email: email, movies: movies };

    setTimeout(() => {
      resolve(emailInfo);
      // reject(new Error("Couldn't send email. See log for more."));
    }, 1000);
  });
}
