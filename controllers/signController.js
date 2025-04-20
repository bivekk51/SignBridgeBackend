const Sign = require("../models/signModels");

// GET /signs - Get all signs (no filtering)
const getAllSigns = async (req, res) => {
  try {
    const signs = await Sign.find({});
    console.log("Fetched signs:", signs);  // Add this
    res.status(200).json(signs);
  } catch (err) {
    console.error(err);  // Add this
    res.status(500).json({ error: "Failed to fetch signs" });
  }
};

// GET /signs/:label - Get specific sign by label
const getSignByLabel = async (req, res) => {
  try {
    const { label } = req.params;
    const sign = await Sign.findOne({ label });

    if (!sign) {
      return res.status(404).json({ error: "Sign not found" });
    }

    res.status(200).json(sign);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve sign" });
  }
};

module.exports={
  getAllSigns,
  getSignByLabel
}