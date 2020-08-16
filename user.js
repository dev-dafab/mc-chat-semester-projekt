const db = require("./db");

const loginRequestHandler = async (req, res) => {
  try {
    const ret = await db.get_user(req.body);
    const { username, password } = ret.rows.pop();
    const isLegit =
      username === req.body.username && password === req.body.password;
    res.status(isLegit ? 200 : 401);
    res.end(isLegit ? JSON.stringify({username}) : {})
  } catch (e) {
    res.end("user not registered");
  }
};

const logoutRequestHandler = (req, res) => {
  res.end(JSON.stringify({ logout: "logout" }));
};

const registrationRequestHandler = async (req, res) => {
  try {
    const user = await db.create_user(req.body);
    console.log(user)
    res.status(201);
    res.end();
  } catch (e) {
    console.log(e);
    res.end({});
  }
};

const userService = (app) => {
  app.post("/users/registration", registrationRequestHandler);
  app.post("/users/login", loginRequestHandler);
  app.post("/users/logout", logoutRequestHandler);
};

module.exports = userService;
