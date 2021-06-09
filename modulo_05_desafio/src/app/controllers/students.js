const student = require("../models/students");
const { age, graduation, classType, date } = require("../../libs/utils");

module.exports = {
    
    index(req, res) {
        student.all(function(students) {
            return res.render("students/index", { students })
        })
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
    
        student.create(req.body, function() {
            return res.redirect("/students");
        })
    },

    show(req, res) {

        student.find(req.params.id, function(student) {

            student.birth = date(student.birth).birthday;

            return res.render(`students/show`, { student });
        })

    },

    edit(req, res) {

        student.find(req.params.id, function(student) {

            student.birth = date(student.birth).iso;

            return res.render(`students/edit`, { student });
        })
    },

    update(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Favor preencha todos os campos");
            }
        }

        student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`);
        })
    
    },

    delete(req, res) {

        student.delete(req.body.id, function() {
            return res.redirect("/students");
        })
    
    }
}


























