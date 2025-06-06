const Router = require("express");
const router = new Router();
const userController = require('../controller/user.controller');
<<<<<<< HEAD
const authenticateToken = require("../middleware/jwtMiddleware");

//? registration
router.post("/register", userController.registerUser);

//? login
router.post("/login", userController.loginUser);

//? get users
router.get("/user", authenticateToken, userController.getUsers);
=======

router.post("/user", userController.createUser);
router.get("/user", userController.getUsers);
>>>>>>> a339a7f23914a4812898e51b9deb03f82ba9737d

module.exports = router;
