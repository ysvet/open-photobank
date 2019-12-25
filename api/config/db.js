const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

process.env.NODE_CONFIG_DIR = './api/config';
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDB CONNECTED');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

autoIncrement.initialize(mongoose.connection);

module.exports = connectDB;
