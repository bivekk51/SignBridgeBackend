const Sign = require("../models/signModels");

// GET /signs - Get all signs (no filtering)
exports.getAllSigns = async (req, res) => {
  try {
    const signs = await Sign.find({}).sort({ label: 1 });
    res.status(200).json(signs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch signs" });
  }
};

// GET /signs/:label - Get specific sign by label
exports.getSignByLabel = async (req, res) => {
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
