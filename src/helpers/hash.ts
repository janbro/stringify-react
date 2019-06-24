import Token from '../models/Token';

// Get the hash of the url
const hash: Token = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial: any, item) {
    if (item) {
      let parts: string[] = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

export default hash;