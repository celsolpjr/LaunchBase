const fs = require("fs");
const data = require("../data.json");
const { date, grade } = require("../utils");

exports.index = function(req, res) {

    return res.render("students/index", { students: data.students });
}

exports.create = function(req, res) {
    return res.render("students/create");
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body);
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Favor preencher todos os dados!");
        }
    }

    let id = 1;
    const lastMember = data.students[data.students.length - 1];

    if(lastMember) {
        id = lastMember.id + 1;
    }

    const birth = Date.parse(req.body.birth);

    data.students.push({ 
        id,
        ...req.body,
        birth
     });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("error!");
        }

        return res.redirect("/students");
    })  
}

exports.show = function(req, res) {

    const { id } = req.params;

    const foundstudent = data.students.find(function(student) {
        return student.id == id;
    })

    if (!foundstudent) {
        return res.send("Professor não encontrado!");
    }

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth).birthday,
        graduate: grade(foundstudent.graduate)
    }

    return res.render("students/show", { student });
}

exports.edit = function(req, res) {
    
    const { id } = req.params;

    const foundstudent = data.students.find(function(student) {
        return student.id == id;
    })

    if(!foundstudent) {
        return res.send("Professor não encontrado!");
    }

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth).iso
    }

    return res.render("students/edit", { student });
}

exports.update = function(req, res) {

    const { id } = req.body;
    let index = 0;

    const foundstudent = data.students.find(function(student, foundIndex) {
        if (student.id == id) {
            index = foundIndex;

            return true;
        }
    })

    if(!foundstudent) 
        return res.send("Professor não encontrado")

    student = {
        ...foundstudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) 
            return res.send("write file error!")

        return res.redirect(`/students/${id}`);
    })

}

exports.delete = function(req, res) {

    const { id } = req.body;

    const filteredstudents = data.students.filter(function(student) {
        return student.id != id;
    })

    data.students = filteredstudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err)
            return res.send("write fille error!");
        
        return res.redirect("/students");
    })

}