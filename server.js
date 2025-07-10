const express = require('express');
const connectToDb = require('./config/db');
const urlRoute = require("./routes/urlRoutes");
const URL = require("./models/url");  
require('dotenv').config();

const app = express();
app.use(express.json());

const Port = process.env.PORT || 2000;
const db_url = process.env.DB_URI;

// Routes
app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // ✅ to return updated document
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectUrl); // ✅ FIXED property name
  } catch (err) {
    console.error("❌ Redirection failed:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/', (req, res) => {
  res.send("This is the home route");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Server Start
const startServer = async () => {
  try {
    await connectToDb(db_url);
    app.listen(Port, () => {
      console.log(`✅ Server is running at http://localhost:${Port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
};

startServer();
