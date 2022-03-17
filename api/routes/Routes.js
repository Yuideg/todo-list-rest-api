module.exports = (app) => {
    const todoController = require("../controllers/todoController");
    const userController = require("../controllers/userController");
    const roleController = require("../controllers/roleController");
    const authController = require("../controllers/auth/authController");

    app
        .route('/api/v1/auth/login')
        .post(authController.Login);
    app
        .route('/api/v1/tasks:user_id')
        .get(todoController.GetAllTaskPerUSer);
    // TODO-01 TASK API ROUTES
    app
        .route("/api/v1/tasks")
        .get(todoController.GetAllTask)
        .get(todoController.GetAllUserTasks)
        .post(todoController.CreateTask);

    app
        .route("/api/v1/me/tasks")
        .get(todoController.GetAllUserTasks)


    app
        .route("/api/v1/tasks/:id")
        .get(todoController.GetTaskByID)
        .put(todoController.UpdateTask)
        .delete(todoController.DeleteTask);

    //TODO-02 USER API ROUTES
    app
        .route("/api/v1/users")
        .get(userController.GetAllUser)
        .post(userController.CreateUser);

    app
        .route("/api/v1/users/:id")
        .get(userController.GetUserByID)
        .put(userController.UpdateUser)
        .delete(userController.DeleteUser);

    //TODO-03 ROLE API ROUTES
    app
        .route("/api/v1/roles")
        .get(roleController.GetAllRole)
        .post(roleController.CreateRole);

    app
        .route("/api/v1/roles/:id")
        .get(roleController.GetRoleByID)
        .put(roleController.UpdateRole)
        .delete(roleController.DeleteRole);
};