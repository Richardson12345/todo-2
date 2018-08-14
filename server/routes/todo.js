var express = require("express");
var router =  express.Router();
var controller = require("../controller/todoController");

router.get('/', controller.readTodo );
router.post('/', controller.addTodo);
router.put('/update/:id', controller.updateTodo);
router.get('/weather', controller.getWeather);
router.delete('/delete/:id', controller.deleteTodo);

module.exports = router