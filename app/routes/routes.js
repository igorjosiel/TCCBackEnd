const { authJwt } = require("../middleware");
const request = require("../controllers/request.controller");
const product = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/products", product.findAll);
  app.post("/product", [authJwt.verifyToken, authJwt.isAdmin], product.create);
  app.get("/product/:id", [authJwt.verifyToken], product.findOne);
  app.put("/product/:id", [authJwt.verifyToken, authJwt.isAdmin], product.update);
  app.delete("/product/:id", [authJwt.verifyToken, authJwt.isAdmin], product.delete);

  app.get("/requests", [authJwt.verifyToken], request.findAll);
  app.post("/request", [authJwt.verifyToken], request.create);
  app.get("/request/:id", [authJwt.verifyToken], request.findOne);
  app.put("/request/:id", [authJwt.verifyToken], request.update);
  app.delete("/request/:id", [authJwt.verifyToken, authJwt.isAdmin], request.delete);
  
  
  
  
//   app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );
//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
};
