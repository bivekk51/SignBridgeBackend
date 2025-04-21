const Sign = require("../models/signModels");


const getAllSigns = async (req, res) => {
  try {
    const { language, label } = req.query;

    const filter = {};
    if (language) {
      filter.language = language.toLowerCase(); // e.g., "ASL" → "asl"
    }
    if (label) {
      filter.label = label.toLowerCase(); // e.g., "A" → "a"
    }

    const signs = await Sign.find(filter);
    res.status(200).json(signs);
  } catch (err) {
    console.error("Error fetching signs:", err);
    res.status(500).json({ error: "Failed to fetch signs" });
  }
};
const getSignByLabel = async (req, res) => {
  try {
    const { label } = req.params;
    const sign = await Sign.findOne({ label: label.toLowerCase() });

    if (!sign) {
      return res.status(404).json({ error: "Sign not found" });
    }

    res.status(200).json(sign);
  } catch (err) {
    console.error("Error fetching sign by label:", err);
    res.status(500).json({ error: "Failed to retrieve sign" });
  }
};


module.exports = {
  getAllSigns,
  getSignByLabel
};
