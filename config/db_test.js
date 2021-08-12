const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:Plymouth.0410@dmc.7r25y.mongodb.net/dummyDMC?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Database connected ....');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
//db test create to just for chekcing and passing test aor failing so that main data is never touched 
// staging databse 