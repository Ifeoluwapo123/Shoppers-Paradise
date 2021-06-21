config = {
  database: {
    development: {
      localhost: "localhost",
      user: "root",
      password: "",
      database: "nodejs_api",
    },
    production: {
      localhost: "remotemysql.com",
      user: "92J9NtN8B6",
      password: "cwXxr6bEbk",
      database: "92J9NtN8B6",
    },
  },
  image: {
    profile: "./public/profileimages",
    product: "./public/images/",
    filetypes: /jpeg|jpg|png|/,
  },
};

module.exports = config;
