module.exports = (app) => {
  const todoController = require("../controllers/todoController");
  const userController = require("../controllers/userController");
  const roleController = require("../controllers/roleController");
  const authController = require("../controllers/auth/authController");

  app
    .route("/login", )
    .post(authController.Login);

  // TODO-01 TASK API ROUTES
  app
    .route("/tasks")
    .get(todoController.GetAllTask)
    .post(todoController.CreateTask);

  app
    .route("/tasks/:id")
    .get(todoController.GetTaskByID)
    .put(todoController.UpdateTask)
    .delete(todoController.DeleteTask);

  //TODO-02 USER API ROUTES
  app
    .route("/users")
    .get(userController.GetAllUser)
    .post(userController.CreateUser);

  app
    .route("/users/:id")
    .get(userController.GetUserByID)
    .put(userController.UpdateUser)
    .delete(userController.DeleteUser);

   //TODO-03 ROLE API ROUTES
   app
   .route("/roles")
   .get(roleController.GetAllRole)
   .post(roleController.CreateRole);

 app
   .route("/roles/:id")
   .get(roleController.GetRoleByID)
   .put(roleController.UpdateRole)
   .delete(roleController.DeleteRole);
};
