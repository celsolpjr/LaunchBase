const { age, graduation, classType, date } = require("../../libs/utils");

module.exports = {

    index(req, res) {

        return res.render("students/index");

    },

    create(req, res) {

        return;

    },

    post(req, res) {

        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Favor preencher todos os dados!");
            }
        }

        return;

    },

    show(req, res) {

        return;

    },

    edit(req, res) {
    
        return;    

    },

    update(req, res) {

        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Favor preencher todos os dados!");
            }
        }

        return;

    },

    delete(req, res) {

        return;

    },

}