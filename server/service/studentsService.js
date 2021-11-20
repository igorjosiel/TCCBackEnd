const db= require('./db');
const helper = require('../../helper');
const messages = require('./utils/messages');

let message = '';
let statusCode = 200;

async function getProducts({ name = "", barCode = "", limit = 10, page = 1 }) {
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

async function getOneProduct(id) {
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
        message = messages.crudProduct('encontrado');
        statusCode = 200;
    }

    return {
        data: data && data[0],
        message,
        statusCode
    }
}

module.exports = {
    getProducts,
    getOneProduct
}

