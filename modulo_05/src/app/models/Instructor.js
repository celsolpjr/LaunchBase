const { age, date } = require("../../libs/utils");
const db = require("../../config/db");

module.exports = {

    all(callback) {
        db.query(`select * from instructors`, function(err, response) {
            if (err) console.log(err);

            callback(response.rows);
        })
    },

    create(data, callback) {

        const query = `
        INSERT INTO instructors (
            avatar_url,
            name,
            birth,
            gender,
            services,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            date(Date.now()).iso
        ];

        db.query(query, values, function(err, response) {

            if(err) console.log(err);

            callback(response.rows[0]);

        });

    }

}