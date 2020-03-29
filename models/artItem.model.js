const mongoose = require("mongoose");
// Art Item Schema
const artItemSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      imgSrc: { type: String, required: true },
      artistName: { type: String, required: true },
      description: { type: String, required: true },
      year: { type: String, required: true },
      location: { type: String, required: true },
    },
    {timestamps: true}
  );
  
  const ArtItem = mongoose.model("ArtItem", artItemSchema);
  
  //export to be used on other pages
  module.exports = ArtItem;