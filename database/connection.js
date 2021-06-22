const config = require("../config/config").database;
const mysql = require("mysql");

const { localhost, user, password, database } = config.development;

const db_config = {
  host: localhost,
  user: user,
  password: password,
  database: database,
};

//mysql connection
handleDisconnect = () => {
  connection = mysql.createConnection(db_config);

  connection.connect((err) => {
    if (err) {
      setTimeout(handleDisconnect, 2000);
    } else console.log("connected to the database");
  });

  connection.on("error", (err) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") handleDisconnect();
    else throw err;
  });
};

if (handleDisconnect()) console.log(handleDisconnect());
//end

module.exports = connection;
