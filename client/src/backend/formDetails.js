const mongoose = require("mongoose")

const formDetailsSchema = new mongoose.Schema(
    {
        artistName:String,
        songName:String,
        songUrl:String,
        imageURL:String,
    },
    {
        collection: "musicData"
    }
)

mongoose.model("musicData", formDetailsSchema);
