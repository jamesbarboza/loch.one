const PortFolio = require('./Portfolio').default;


class User {
  static users: { [key: string]: User } = {};
  constructor(
    public id: string,
    public portfolio: typeof PortFolio
  ) {
    User.users[id] = this;
  }
}

export default User;
