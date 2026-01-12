// service/loginService.js
const dummyUser = { email: "admin@gmail.com", password: "12345" };

exports.logLogic = (username, password) => {
  return username === dummyUser.email && password === dummyUser.password;
};
