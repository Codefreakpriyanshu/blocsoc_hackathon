const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const mongodb = require(`mongodb`)
const Track_data = require('./formDetails')
//conectin to database
const DB = `mongodb+srv://mihir1101:mihir1101@cluster0.w0iczi8.mongodb.net/logindata?retryWrites=true&w=majority`
mongoose.connect(DB, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("connected to backend");
    })
    .catch((e) => console.log(e));

require("./formDetails");
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const Music = mongoose.model("musicData");

app.get("/UploadYourMusic", (req,res)=>{
    res.render('upload')
})

app.post("/UploadYourMusic", async (req, res) => {
    try {
        const newMusic = Music.create({
            artistName: req.body.artistName,
            songName: req.body.musicName,
            songUrl: req.body.musicUrl,
            track_artURL : req.body.imageURL
        })
        res.render('upload')

    } catch (error) {
        res.send({Staus:"error"})
    }
})

app.listen(3000, () => {
})

let track_data = Track_data.find({},function(err,tracks){
    if(err) console.warn(err);
    return tracks;
})
export {track_data};
song_list_container=document.querySelector('.song-list')
window.onload() = function Song_list(){
    for(let i = 0;i<track_data.length;i++){
        song_list_container.innerHTML = `<img class ="track-art" src = '${track_data[i].track_artURL}'> <span class="track-name"> ${track_data[i].songName} </span> <span class="artist-name"> ${track_data[i].artistName} </span> <img class="download-icon" src = "../../public/download-icon.png"> <button class="btn">play</button> `;
    }
}
