const mongoose = require("mongoose");

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// temporary for dev purposes
const url = "mongodb://mongo:27017/docker-node-mongo";
mongoose
  .connect(url, options)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));
