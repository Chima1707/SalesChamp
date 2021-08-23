const mongoose = require("mongoose");

module.exports = function (connectionString, callback) {
  mongoose.connect(
    connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      callback(err);
    }
  );

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log("Mongo Database disconnected through app termination");
      process.exit(0);
    });
  });
  require("./model");
};
