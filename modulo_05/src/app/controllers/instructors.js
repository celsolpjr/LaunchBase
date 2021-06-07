const { age, date } = require("../../lib/utils");
const instructor = require("../models/instructors")

module.exports = {

    index(req, res) {

        instructor.all(function(instructors) {
            return res.render("instructors/index", { instructors });
        })

    },

    create(req, res) {
        return res.render("instructors/create");
    },

    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos!");
            }
        }

        instructor.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${instructor.id}`)
        }) 
    },

    show(req, res) {
        instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("instructor not found!")

            instructor.age = age(instructor.birth);
            instructor.services = instructor.services.split(",");
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })
    },

    edit(req, res) {
        return;
    },

    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos!");
            }
        }

        let { avatar_url, birth, name, services, gender } = req.body;

        return;
    },
    
    delete(req, res) {
        return;
    }
}