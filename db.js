const { Client } = require("pg");

const setup_db = `
drop table persons;

create table persons(
     id SERIAL PRIMARY KEY NOT NULL,
     username   varchar(255) NOT NULL CHECK (username <> ''),
     password   varchar(255) NOT NULL CHECK (password <> '')
);

INSERT INTO persons (username,password) VALUES ('mc', 'password');
`;

class DB {
  constructor() {
    this.client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    this.client.connect();
  }

  create_user(user) {
    const { username, password } = user;

    return this.client.query(
      `
INSERT INTO persons (username, password) VALUES ('${username}','${password}');
`
    );
  }

  get_user(userPredicate) {
    const { username } = userPredicate;
    const query = `SELECT * FROM persons WHERE username='${username}';`;
    console.log(query);
    return this.client.query(query);
  }
}

module.exports = new DB();
