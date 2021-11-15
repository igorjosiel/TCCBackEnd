const db= require('./db');
const helper = require('../../helper');
const messages = require('./utils/messages');

let message = '';
let statusCode = 200;

async function getStudents({ name = "", barCode = "", limit = 10, page = 1 }) {
    const params = [];
    const offset = (page - 1) * limit;

    let pagination = {};
    let sql = 'select * from products where 1 = 1';

    if (name !== '') {
        sql += ' and name LIKE ?';
        params.push(`%${name}%`);
    }
    if (barCode !== '') {
        sql += ' and barCode LIKE ?';
        params.push(`%${barCode}%`);
    }

    sql += ` limit ${limit} offset ${offset}`;
    
    const rows = await db.query(sql, params);
    const data = helper.emptyOrRows(rows);

    pagination = {
        previousPage: page == 1 ? 1 : parseInt(page) - 1,
        page,
        nextPage: rows.length < 10 ? page : parseInt(page) + 1,
        totalResults: rows.length,
    }

    if (data.length === 0) {
        message = messages.noStudentFound();
        statusCode = 200;
    }
    else {
        message = messages.studentsFound();
        statusCode = 200;
    }

    return {
        data,
        pagination,
        message,
        statusCode
    }
}

async function getOneStudent(id) {
    let row;

    if (id) {
        row = await db.query(
            'select * from products WHERE id = ?',
            [id]
        );
    }
    else return {
        message: messages.withoutId('buscar'),
        statusCode: 400
    }

    const data = helper.emptyOrRows(row);

    if (row.length === 0) {
        message = messages.invalidId();
        statusCode = 400;
    }
    else {
        message = messages.crudStudent('encontrado');
        statusCode = 200;
    }

    return {
        data: data && data[0],
        message,
        statusCode
    }
}

// async function createStudent({ name, email, ra, cpf }) {
//     let result;

//     // Verify if ra already exists
//     const row = await db.query('select * from students where ra = ?', [ra]);

//     if (!name || !email || !ra || !cpf) {
//         return {
//             message: messages.mandatoryFields(),
//             statusCode: 400
//         }
//     }
//     else if (row.length > 0) {
//         return {
//             message: messages.registerAlreadyExists(),
//             statusCode: 400
//         }
//     }
//     else if (cpf.length !== 11) {
//         return {
//             message: messages.invalidCPF(),
//             statusCode: 400
//         }
//     }
//     else {
//         result = await db.query(
//             `INSERT INTO students (name, email, ra, cpf) VALUES (?, ?, ?, ?)`,
//             [name, email, ra, cpf]
//         );
//     }

//     if (result.affectedRows) {
//         message = messages.crudStudent('cadastrado');
//         statusCode = 201;
//     }
//     else {
//         message = messages.createError(),
//         statusCode = 400;
//     }

//     return  {
//         message,
//         statusCode
//     };
// }

// async function updateStudent(id, {name, email}) {
//     let result;

//     if (id && name !== "" && email !== "") {
//         result = await db.query(
//             `UPDATE students SET name = ?, email = ? WHERE id = ?`,
//             [name, email, id]
//         );
//     }
//     else return {
//         message: messages.mandatoryFields(),
//         statusCode: 400
//     }
    
//     if (result.affectedRows) {
//         message = messages.crudStudent('atualizado');
//         statusCode = 200;
//     }
//     else {
//         message = messages.studentDoesntExist(),
//         statusCode = 400;
//     }

//     return {
//         message,
//         statusCode
//     };
// }

// async function removeStudent(id) {
//     let result;

//     if (id) {
//         result = await db.query(
//             `DELETE FROM students WHERE id = ?`,
//             [id]
//         );
//     }
//     else return {
//         message: messages.withoutId('remover'),
//         statusCode: 400
//     }

//     if (result.affectedRows) {
//         message = messages.crudStudent('removido');
//         statusCode = 200;
//     }
//     else {
//         message = messages.studentDoesntExist();
//         statusCode = 400;
//     }

//     return {
//         message,
//         statusCode
//     };
// }

module.exports = {
    getStudents,
    // createStudent,
    // updateStudent,
    // removeStudent,
    getOneStudent
}

