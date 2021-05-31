const router = require("express").Router();

const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/", authorize, async (req, res) => {
    try {
        const user = await pool.query("SELECT u.user_name, t.todo_id, t.description, t.address, t.time FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1", 
        [req.user.id]
        );

        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/todos", authorize, async (req, res) => {
    try {
      console.log(req.body)
      const { description } = req.body;
      const { address } = req.body;
      const { time } = req.body;
    const newTodo = await pool.query(
        "INSERT INTO todos (user_id, description, address, time, date) VALUES ($1, $2, $3, $4, current_date) RETURNING *", [req.user.id, description, address, time]
    );
  
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  router.put("/todos/:id", authorize, async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
        [description, id, req.user.id]
      );
      if(updateTodo.rows.length === 0) {
        return res.json("this todo is not yours");
      }
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });


  router.delete("/todos/:id", authorize, async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *", [
        id, req.user.id]);

      if(deleteTodo.rows.length === 0) {
        return res.json("This todo is not yours");
      }
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

module.exports = router;