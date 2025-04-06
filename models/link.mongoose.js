import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  }
});

const Link = mongoose.model("Link", linkSchema);

export default Link;