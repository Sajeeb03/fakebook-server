const aboutMe = (app, About) => {
    app.post("/about", async (req, res) => {
        try {
            const result = await About.insertOne(req.body);
            res.send({
                success: true,
                message: "uploaded"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

const getAboutMe = (app, About) => {
    app.get("/about", async (req, res) => {
        try {
            const result = await About.findOne({ email: "sajeebmuntasir0@gmail.com" });
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

module.exports = { aboutMe, getAboutMe }