module.exports = {
  params(key) {
    const method = this.request.method;
    if (method === "GET") {
      return key ? this.query[key] : this.query;
    } else {
      return key ? this.request.body[key] : this.request.body;
    }
  },
  get username() {
    if(!this.request.header.authorization) return
    const [, token] = this.request.header.authorization.split(" ");
    const tokenCache = token
      ? this.app.jwt.verify(token, this.app.config.jwt.secret)
      : undefined;

    return tokenCache ? tokenCache.username : undefined;
  },
  get userId() {
    if(!this.request.header.authorization) return
    const [, token] = this.request.header.authorization.split(" ");
    const tokenCache = token
      ? this.app.jwt.verify(token, this.app.config.jwt.secret)
      : undefined;

    return tokenCache ? tokenCache.id : undefined;
  },
};
