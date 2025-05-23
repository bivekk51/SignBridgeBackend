
const Signword = require('../models/SignwordModels');

const getAllSignwords = async (req, res) => {
  try {
    const signwords = await Signword.find();
    res.json(signwords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSignwordByLabel = async (req, res) => {
    try {
      const signword = await Signword.findOne({ label: req.params.label });
      if (!signword) {
        return res.status(404).json({ message: 'Signword not found' });
      }
      res.json(signword);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports={
    getAllSignwords,
    getSignwordByLabel
}