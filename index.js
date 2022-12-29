const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { getUsers, postUser } = require('./API/users');
const { postStatus, getStatus, updateReaction, getStatusHome } = require('./API/posts');
require('dotenv').config();

const app = express();
const port = process.env.port;
app.use(cors());

app.use(express.json());


const uri = process.env.URI;

const client = new MongoClient(uri);

const dbConnect = async () => {
    try {
        await client.connect();
        console.log("DB connected")
    } catch (error) {
        console.log(error.message)
    }
}

dbConnect();

//collections
const Users = client.db("fakebook").collection("users");
const Posts = client.db("fakebook").collection("posts");

//user operations
getUsers(app, Users);
postUser(app, Users);


//post operations
postStatus(app, Posts);
getStatus(app, Posts);
getStatusHome(app, Posts)
updateReaction(app, Posts);
app.get("/", (req, res) => {
    res.send("Server Is Running")
})
app.listen(port, () => console.log(`Server running at port ${port}`));

// module.exports = app;