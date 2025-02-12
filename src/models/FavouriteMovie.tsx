import mongoose from "mongoose";

const favouriteMovieSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

favouriteMovieSchema.index({ userId: 1, slug: 1 }, { unique: true });

const FavouriteMovie =
  mongoose.models.FavouriteMovie ||
  mongoose.model("FavouriteMovie", favouriteMovieSchema);

export default FavouriteMovie;
