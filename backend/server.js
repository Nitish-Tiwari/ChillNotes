const connectToMongo = require('./db');
const express = require('express')
const dotenv = require("dotenv")
const path = require("path")
var cors = require('cors')
connectToMongo();

const app = express()
dotenv.config()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

//Avaialbe routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
} else {

    app.get('/', (req, res) => {
        res.send('Hello Nitish!')
    });
}
// --------------------------deployment------------------------------





app.listen(port, () => {
    console.log(`iNoteBook backend listening on port ${port}`)
})