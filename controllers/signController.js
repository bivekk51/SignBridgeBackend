const Sign = require("../models/signModels");

// GET /signs - List all signs (optionally filtered by language)
exports.getAllSigns = async (req, res) => {
  try {
    const language = req.query.language;
    const query = language ? { language } : {};
    const signs = await Sign.find(query).sort({ label: 1 });
    res.status(200).json(signs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch signs" });
  }
};

// GET /signs/:label - Get specific sign by label (optionally with language)
exports.getSignByLabel = async (req, res) => {
  try {
    const { label } = req.params;
    const language = req.query.language;
    const query = { label };
    if (language) query.language = language;

    const sign = await Sign.findOne(query);
    if (!sign) {
      return res.status(404).json({ error: "Sign not found" });
    }

    res.status(200).json(sign);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve sign" });
  }
};

// POST /signs - Add new sign (OPTIONAL)
exports.createSign = async (req, res) => {
  try {
    const { label, language, image, description } = req.body;

    if (!label || !language || !image) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newSign = new Sign({ label, language, image, description });
    await newSign.save();

    res.status(201).json(newSign);
  } catch (err) {
    res.status(500).json({ error: "Failed to create sign" });
  }
};
