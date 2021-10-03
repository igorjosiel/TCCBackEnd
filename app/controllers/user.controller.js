const db = require("../models");
const Model = db.user;
const modelName = "user";
const Op = db.Sequelize.Op;
// const { encrypt, decrypt } = require("../crypto");

// Create and Save a new Tutorial
// exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a Tutorial
  // const object = {
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: encrypt(req.body.password).content,
  // };

  // Save Tutorial in the database
//   Model.create(object)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || `Some error occurred while creating the ${modelName}.`,
//       });
//     });
// };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Model.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some error occurred while retrieving ${modelName}.`,
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Model.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving ${modelName} with id= ${id}`,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Model.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: `${modelName} was updated successfully.`,
        });
      } else {
        res.send({
          message: `Cannot update ${modelName} with id=${id}. Maybe  ${modelName} was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating ${modelName} with id= ${id}`,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Model.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: ` ${modelName} was deleted successfully!`,
        });
      } else {
        res.send({
          message: `Cannot delete ${modelName} with id=${id}. Maybe  ${modelName} was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete ${modelName} with id = ${id}`,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Model.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums}  ${modelName} were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while removing all ${modelName}.`,
      });
    });
};

// find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Tutorial.findAll({ where: {} })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || `Some error occurred while retrieving ${modelName}.`
//       });
//     });
// };




exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
