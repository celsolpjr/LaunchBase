const { age, graduation, classType, date } = require("../../libs/utils");

module.exports = {
    
    index(req, res) {

        return res.render("teachers/index");
    },

    create(req, res) {
        return res.render("teachers/create");
    },

    post(req, res) {

        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Favor preencher todos os dados!");
            }
        }
    
        let { avatar_url, name, birth, graduate, class_type, atuation_area } = req.body; 
    },

    show(req, res) {

        return
    },

    edit(req, res) {

        return res.render("teachers/edit");
    },

    update(req, res) {

        return
    
    },

    delete(req, res) {

        return
    
    }
}













