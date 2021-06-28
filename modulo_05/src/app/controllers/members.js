const { age, date } = require("../../libs/utils");

module.exports = {
    index(req, res) {

        return res.render("member/index");

    },

    show(req, res) {

        return

    },

    create(req, res) {

        return

    },

    post(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos!");
            }
        }

        return

    },

    edit(req, res) {

    },

    put(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos!");
            }
        }

        return

    },

    delete(req, res) {

        return

    }
}