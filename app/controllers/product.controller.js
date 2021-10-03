const db = require("../models");
const Product = db.product;
const modelName = "product";
const Op = db.Sequelize.Op;
// const { encrypt, decrypt } = require("../crypto");

// Create and Save a new product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "O conteúdo não pode ser vazio!"
    });
    return;
  }

  // Create a product
  const object = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    barcode: req.body.barcode,
    category: req.body.category
  };

  // Save product in the database
  Product.create(object)
    .then((data) => {
      res.send({message: "Produto cadastrado com sucesso!"});
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Ocorreu algum problema ao criar o produto ${modelName}.`,
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Model.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Ocorreu algum erro ao buscar pelos produtos!`,
      });
    });
};

// Find a single product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Model.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Ocorreu algum erro ao tentar buscar por um produto!`
      });
    });
};

// Update a product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Model.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Produto atualizado com sucesso!`,
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o ${modelName}. Talvez o ${modelName} não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Erro ao atualizar o ${modelName}!`,
      });
    });
};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Model.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `${modelName} deletado com sucesso!`,
        });
      } else {
        res.send({
          message: `Não foi possícvel deletar o ${modelName}. Talvez o ${modelName} não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Não foi possível deletar o ${modelName}!`,
      });
    });
};

// Delete all products from the database.
exports.deleteAll = (req, res) => {
  Model.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums}  ${modelName} foram deletados!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Algum erro aconteceu ao tentar deletar os ${modelName}.`,
      });
    });
};



