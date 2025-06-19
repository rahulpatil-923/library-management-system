
// Example logic (you should use database here instead)
const dummyUser = { username: "admin", password: "1234" };

exports.logLogic = (username, password) => {
  if (username === dummyUser.username && password === dummyUser.password) {
    return true;
  }
  return false;
};
