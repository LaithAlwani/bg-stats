import { model, models, Schema } from "mongoose";

const boardgameSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    minPlayers:{
        type:Number,
        required:true
    },
    maxPlayers:{
        type:Number,
        required:true
    },
    isExpansion:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

const boardgame = models.Boardgame || model("Boardgame", boardgameSchema);

export default boardgame;