const passRegExp = /^[!-z]{8,30}$/;

const urlRegExp = /^https?:\/\/(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$/;

module.exports = { passRegExp, urlRegExp };
