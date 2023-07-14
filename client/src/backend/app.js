const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const mongodb = require(`mongodb`)
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
        res.send({status:"error"})
    }
})

app.listen(3000, () => {
})
app.get('/',async (req,res) => {
     try{
         let track_data = await Music.find({});
         res.send({status:"ok",data:track_data});
     }catch(err){
         res.send({status:"error"})
     }
    
}
