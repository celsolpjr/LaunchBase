const db = require("../../config/db");
const { age, graduation, classType, date } = require("../../libs/utils");

module.exports = {
    all(callback) {

        db.query(`SELECT *
            FROM teachers
            ORDER BY name ASC`, function(err, results) {
                if(err) throw `Database Error ${err}`

                callback(results.rows);
            })

    },

    create(data, callback) {

        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth,
                graduate,
                class_type,
                atuation_area,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.graduate,
            data.class_type,
            data.atuation_area,
            date(Date.now()).iso
        ] 

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0]);
        })

    },

    find(id, callback) {

        db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error ${err}`

            callback(results.rows[0]);
        })

    },

    update(data, callback) {
        
        const query = `
            UPDATE teachers SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                graduate=($4),
                class_type=($5),
                atuation_area=($6)
            WHERE id= $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.graduate,
            data.class_type,
            data.atuation_area,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error ${err}`

            callback();
        })

    },

    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error ${err}`

            callback();
        })
    }
}