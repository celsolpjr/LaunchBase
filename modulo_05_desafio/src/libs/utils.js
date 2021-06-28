module.exports = {
    age (timestamp) {

        const todayDate = new Date();
        const birthDate = new Date(timestamp);

        const todayMonth = todayDate.getMonth();
        const birthMonth = birthDate.getMonth();

        const todayDay = todayDate.getDate();
        const birthDay = birthDate.getDate();

        let age = todayDate.getFullYear() - birthDate.getFullYear();

        

        if (todayMonth < birthMonth || todayMonth == birthMonth && todayDay < birthDay) {
            return age - 1;
        }

        return age;

    },

    graduation (params) {
        switch(params) {
            case "EM":
                return "Ensino Médio Completo";
                break;

            case "ES":
                return "Ensino Superior Completo";
                break;

            case "MS":
                return "Mestrado";
                break;

            case "DT":
                return "DT";
                break;
        }
    },

    classType (params) {
        if (params == "P") {
            return "Presencial";
        } else {
            return "À Distância";
        }
    },

    date (timestamp) {

        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day: `${day}`,
            month: `${month}`,
            year: `${year}`,
            birthday: `${day}-${month}`,
            iso: `${year}-${month}-${day}`
        }

    },

    grade (params) {
        switch(params) {
            case "5EF":
                return "5º Ano do ensino fundamental"
            case "6EF":
                return "6º Ano do ensino fundamental"
            case "7EF":
                return "7º Ano do ensino fundamental"
            case "8EF":
                return "8º Ano do ensino fundamental"
            case "1EM":
                return "1º Ano do ensino médio"
            case "2EM":
                return "2º Ano do ensino médio"
            case "3EM":
                return "3º Ano do ensino médio"
        }
    }
}