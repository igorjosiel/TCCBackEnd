const noProductFound = () => {
    return 'Nenhum produto foi encontrado!';
}

const productsFound = () => {
    return 'Produtos encontrados com sucesso!';
}

const invalidId = () => {
    return 'Não existe nenhum produto com esse identificador no sistema!';
}

const withoutId = (operation) => {
    return `Não é possível ${operation} um produto sem um identificador!`;
}

const crudProduct = (operation) => {
    return `Produto ${operation} com sucesso!`;
}

module.exports = {
    noProductFound,
    productsFound,
    invalidId,
    withoutId,
    crudProduct,
}