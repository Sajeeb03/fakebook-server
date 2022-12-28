
const postUser = (app, Users) => {
    app.put("/users", async (req, res) => {
        try {
            const user = req.body;
            const { email } = req.query;
            const filter = { email: email }
            const update = {
                $set: user

            }
            const result = await Users.updateOne(filter, update, { upsert: true });
            res.send({
                success: true,
                message: "User posted"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

const getUsers = (app, Users) => {
    app.get('/users', async (req, res) => {
        try {
            const result = await Users.find({}).toArray();
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
    });
}

module.exports = { getUsers, postUser }