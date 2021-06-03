const fs = require("fs");
const data = require("../data.json");
const { age, graduation, classType, date } = require("../utils");

exports.index = function(req, res) {

    return res.render("teachers/index", { teachers: data.teachers });
}

exports.create = function(req, res) {
    return res.render("teachers/create");
}

exports.post = function(req, res) {

    const keys = Object.keys(req.body);
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Favor preencher todos os dados!");
        }
    }

    let { avatar_url, name, birth, graduate, class_type, atuation_area } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    let id = 1;
    const lastMember = data.teachers[data.teachers.length - 1];

    if(lastMember) {
        id = lastMember.id + 1;
    }

    data.teachers.push({ 
        id,
        avatar_url,
        name,
        birth,
        graduate,
        class_type,
        atuation_area,
        created_at
     });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("error!");
        }

        return res.redirect("/teachers");
    })  
}

exports.show = function(req, res) {

    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id;
    })

    if (!foundTeacher) {
        return res.send("Professor não encontrado!");
    }

    const teacher = {
        ...foundTeacher,
        birth: age(foundTeacher.birth),
        graduate: graduation(foundTeacher.graduate),
        class_type: classType(foundTeacher.class_type),
        atuation_area: foundTeacher.atuation_area.split(","),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundTeacher.created_at)
    }

    return res.render("teachers/show", { teacher });
}

exports.edit = function(req, res) {
    
    const { id } = req.params;

    const foundTeacher = data.teachers.find(function(teacher) {
        return teacher.id == id;
    })

    if(!foundTeacher) {
        return res.send("Professor não encontrado!");
    }

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render("teachers/edit", { teacher });
}

exports.update = function(req, res) {

    const { id } = req.body;
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex;

            return true;
        }
    })

    if(!foundTeacher) 
        return res.send("Professor não encontrado")

    teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) 
            return res.send("write file error!")

        return res.redirect(`/teachers/${id}`);
    })

}

exports.delete = function(req, res) {

    const { id } = req.body;

    const filteredTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id;
    })

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err)
            return res.send("write fille error!");
        
        return res.redirect("/teachers");
    })

}