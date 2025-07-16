const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortId = nanoid(5);
  const baseUrl = "http://infi:8080"; // ✅ Updated port and host

  try {
    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
    });

    const fullShortUrl = `${baseUrl}/${shortId}`;
    return res.json({ shortUrl: fullShortUrl }); // ✅ Response contains full short URL
  } catch (error) {
    console.error("❌ Error creating short URL:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
};
