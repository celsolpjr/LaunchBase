const teacher = require("../models/teachers");
const { age, graduation, classType, date } = require("../../libs/utils");

module.exports = {
    
    index(req, res) {
        teacher.all(function(teachers) {
            return res.render("teachers/index", { teachers })
        })
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
    
        teacher.create(req.body, function() {
            return res.redirect("/teachers");
        })
    },

    show(req, res) {

        teacher.find(req.params.id, function(teacher) {

            teacher.birth = age(teacher.birth);
            teacher.graduate = graduation(teacher.graduate);
            teacher.class_type = classType(teacher.class_type);
            teacher.atuation_area = teacher.atuation_area.split(",");
            teacher.created_at = date(teacher.created_at).createdAt;

            return res.render(`teachers/show`, { teacher });
        })

    },

    edit(req, res) {

        teacher.find(req.params.id, function(teacher) {

            teacher.birth = date(teacher.birth).iso;

            return res.render(`teachers/edit`, { teacher });
        })
    },

    update(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Favor preencha todos os campos");
            }
        }

        teacher.update(req.body, function() {
            return res.redirect(`/teachers/${req.body.id}`);
        })
    
    },

    delete(req, res) {

        teacher.delete(req.body.id, function() {
            return res.redirect("/teachers");
        })
    
    }
}













