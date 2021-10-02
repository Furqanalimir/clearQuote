const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try
  {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log('mongodb connected successfully');
  } catch (err)
  {
    console.log('something went wrong with mongodb connection', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;