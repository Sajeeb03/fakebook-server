const { ObjectId } = require("mongodb");

const postStatus = (app, Posts) => {
    app.post("/posts", async (req, res) => {
        try {
            const result = await Posts.insertOne(req.body);
            res.send({
                success: true,
                message: "Posted"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

const getStatus = (app, Posts) => {
    app.get("/posts", async (req, res) => {
        try {
            const result = await Posts.find({}).sort({ time: -1 }).toArray();
            res.send({
                status: true,
                data: result
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

const getStatusHome = (app, Posts) => {
    app.get("/posts-home", async (req, res) => {
        try {
            const result = await Posts.find({})
                .sort({ reaction: -1 })
                .limit(3)
                .toArray();
            res.send({
                status: true,
                data: result
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

const updateReaction = (app, Posts) => {
    app.put("/posts/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const { uid } = req.body
            // console.log(uid, id)
            const filter = { _id: ObjectId(id) }
            const post = await Posts.findOne(filter);
            // console.log(post);
            const list = post.uid;
            if (list) {
                if (list.includes(uid)) {
                    // console.log(true)
                    res.send({
                        success: false,
                        message: "Already Reacted"
                    })
                    return;
                }
            }
            // console.log(list)


            const query = { _id: ObjectId(id) }
            console.log(query)
            const update = {
                $set: {
                    reaction: post.reaction + 1,
                    uid: [uid]
                }
            };
            const result = await Posts.updateOne(query, update, { upsert: true })
            res.send({
                success: true,
                message: "Updated"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

const getDetails = (app, Posts) => {
    app.get("/post/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const query = { _id: ObjectId(id) };
            const result = await Posts.findOne(query);
            res.send({
                success: true,
                data: result
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = { postStatus, getStatus, getStatusHome, updateReaction, getDetails }