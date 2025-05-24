const Review = require('../models/reviewModels');


const createReview = async (req, res) => {
  try {
    const { status, signtype, label, postedBy } = req.body;

    if (!status || !signtype || !label || !postedBy) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newReview = new Review({ status, signtype, label, postedBy });
    await newReview.save();

    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create review', details: err.message });
  }
};


const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('postedBy', 'name email') 
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews', details: err.message });
  }
};

module.exports = { createReview, getAllReviews };
