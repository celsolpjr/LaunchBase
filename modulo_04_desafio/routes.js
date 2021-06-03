const express = require("express");
const teachers = require("./controllers/teachers");
const students = require("./controllers/students");

const routes = express.Router();

routes.get("/", function(req, res) {
    return res.redirect("/teachers");
})

/* TEACHERS ROUTES */

routes.get("/teachers", teachers.index)
routes.get("/teachers/create", teachers.create)
routes.post("/teachers", teachers.post)
routes.put("/teachers", teachers.update)
routes.delete("/teachers", teachers.delete)
routes.get("/teachers/:id", teachers.show)
routes.get("/teachers/:id/edit", teachers.edit)

/* STUDENTS ROUTES */

routes.get("/students", students.index)
routes.get("/students/create", students.create)
routes.post("/students", students.post)
routes.put("/students", students.update)
routes.delete("/students", students.delete)
routes.get("/students/:id", students.show)
routes.get("/students/:id/edit", students.edit)

module.exports = routes;






