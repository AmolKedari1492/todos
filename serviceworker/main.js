// Make sure Service Worker is supported
if ('serviceWorker' in navigator) {
    console.log("sw is present")
    window.addEventListener('load', () => {
        // Register our recently created file
        navigator.serviceWorker.register('./service-worker.js').then( registration => {
            console.log(registration)
          console.log('Registration was successfully completed');
        })
        .catch( err => {
          console.log('There was an error during the registration of the Service Worker', err);
        });
    });
  }
  