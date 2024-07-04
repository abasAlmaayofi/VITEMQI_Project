onmessage = function (event) {
  let counter = event.data;
  var intervalId = this.setInterval(() => {
    counter--;
    postMessage(counter);
    if (counter === 0) {
      this.clearInterval(intervalId);
    }
  }, 1000);
};
