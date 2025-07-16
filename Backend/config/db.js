const mongoose = require("mongoose");

const connectToDb = async (db_url) => {
  try {
    await mongoose.connect(db_url);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = connectToDb;