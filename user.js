

const loginRequestHandler = (req, res) => {
  console.log(req.body)
  res.end(JSON.stringify({login: 'login'}));
}

const logoutRequestHandler = (req, res) => {
  console.log(req.body)
  res.end( JSON.stringify({logout: 'logout'}));
}

const registrationRequestHandler = (req, res) => {
  console.log(req.body)
  res.end({registration: 'registration'});
}


const userService = (app) => {
  app.post("/users/registration", registrationRequestHandler);
  app.post("/users/login", loginRequestHandler);
  app.post("/users/logout", logoutRequestHandler);
}

module.exports = userService;
