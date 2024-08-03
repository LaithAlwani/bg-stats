import { model, models, Schema } from "mongoose";

const boardgameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    year:String,
    minPlayers: {
      type: Number,
      required: true,
    },
    maxPlayers: {
      type: Number,
      required: true,
    },
    minPlayTime: {
      type: Number,
      required: true,
    },
    maxPlayTime: {
      type: Number,
      required: true,
    },
    minAge: {
      type: String,
    },
    description: String,
    bggId: String,
    isExpansion: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const boardgame = models.Boardgame || model("Boardgame", boardgameSchema);

export default boardgame;
