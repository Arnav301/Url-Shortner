const mongoose = require("mongoose");

const connectToDb = async (db_url) => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDb;