

const admin = {
  username: "mahesh",
  password: "mahesh1525"
};

exports.logLogic = (username, password) => {
  if (username === admin.username && password === admin.password) {
    return admin;
  } else {
    return null; 
  }
};
