const db = require("../models");
const Model = db.request;
const modelName = "request";
const Op = db.Sequelize.Op;
// const { encrypt, decrypt } = require("../crypto");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "O conteúdo não pode ser vazio!"
    });
    return;
  }

  // Create a request
  const object = {
    client: req.body.client,
    description: req.body.description,
    idProduct: req.body.idProduct,
    status: 1
  };

  // Save request in the database
  Model.create(object)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Algum erro aconteceu ${modelName}.`,
      });
    });
};

// Retrieve all requests from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Model.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Algum erro aconteceu!`,
      });
    });
};

// Find a single request with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Model.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Algum algum erro ao tentar buscar por esse registro!`,
      });
    });
};

// Update a request by the id
exports.update = (req, res) => {
  const id = req.params.id;

  Model.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `Foi atualizado com sucesso!.`,
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o registro. Talvez o mesmo não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Erro ao atualizar o registro!`,
      });
    });
};

// Delete a request
exports.delete = (req, res) => {
  const id = req.params.id;

  Model.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `O registro foi excluído com sucesso!`,
        });
      } else {
        res.send({
          message: `Não foi possível deletar esse registro. Talvez o mesmo não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Não foi possível deletar esse registro!`,
      });
    });
};

// Delete all requests from the database.
exports.deleteAll = (req, res) => {
  Model.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `Todos os registros foram deletados com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Ocorreu algum erro ao tentar deletar todos os registros.`,
      });
    });
};