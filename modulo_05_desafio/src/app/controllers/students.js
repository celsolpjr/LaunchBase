const Student = require("../models/students");
const { age, graduation, classType, date } = require("../../libs/utils");

module.exports = {
    
    index(req, res) {
        Student.all(function(students) {
            return res.render("students/index", { students })
        })
    },

    create(req, res) {

        Student.selectOptionsTeachers(function(options) {
            return res.render("students/create", { teachers: options });
        })
    },

    post(req, res) {

        const keys = Object.keys(req.body);
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Favor preencher todos os dados!");
            }
        }
    
        Student.create(req.body, function() {
            return res.redirect("/students");
        })
    },

    show(req, res) {

        Student.find(req.params.id, function(student) {

            student.birth = date(student.birth).birthday;

            console.log(student);

            return res.render(`students/show`, { student });
        })

    },

    edit(req, res) {

        Student.find(req.params.id, function(student) {

            student.birth = date(student.birth).iso;

            Student.selectOptionsTeachers(function(options) {
                return res.render(`students/edit`, { student, teachers: options });
            })
            
        })
    },

    update(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Favor preencha todos os campos");
            }
        }

        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`);
        })
    
    },

    delete(req, res) {

        Student.delete(req.body.id, function() {
            return res.redirect("/students");
        })
    
    }
}


























