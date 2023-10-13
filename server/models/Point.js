import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  wasteType: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  proof: {
    type: String,
    required: true
  }
  // Other point-related fields
});

const Point = mongoose.model('Point', pointSchema);

export default Point;

