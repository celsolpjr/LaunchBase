const { date, grade } = require("../../libs/utils");

module.exports = {

    index(req, res) {

        return res.render("students/index");
    },

    create(req, res) {
        return res.render("students/create");
    },

    post(req, res) {

        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Favor preencher todos os dados!");
            }
        }
    
        return
    },

    show(req, res) {

        return res.render("students/show");
    },

    edit(req, res) {

        return res.render("students/edit");
    },

    update(req, res) {

        return
    },

    delete(req, res) {

        return
    
    }

}













