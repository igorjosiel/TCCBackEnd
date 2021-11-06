const noStudentFound = () => {
    return 'Nenhum aluno foi encontrado!';
}

const studentsFound = () => {
    return 'Alunos encontrados com sucesso!';
}

const invalidId = () => {
    return 'Não existe nenhum aluno com esse identificador no sistema!';
}

const withoutId = (operation) => {
    return `Não é possível ${operation} um aluno sem um identificador!`;
}

const crudStudent = (operation) => {
    return `Aluno ${operation} com sucesso!`;
}

const mandatoryFields = () => {
    return 'Por favor, preencha todos os campos obrigatórios!';
}

const registerAlreadyExists = () => {
    return 'Já existe um aluno com esse número de registro no sistema!';
}

const invalidCPF = () => {
    return 'Por favor, digite um CPF válido!';
}

const createError = () => {
    return 'Falha ao cadastrar o aluno!';
}

const studentDoesntExist = () => {
    return 'O aluno solicitado não existe!';
}

module.exports = {
    noStudentFound,
    studentsFound,
    invalidId,
    withoutId,
    crudStudent,
    mandatoryFields,
    registerAlreadyExists,
    invalidCPF,
    createError,
    studentDoesntExist
}