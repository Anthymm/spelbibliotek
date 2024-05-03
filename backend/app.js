const connectionMySQL = require("./connectionMySQL");

// Import express and cors
const express = require("express");
const cors = require("cors");

//
const app = express();
const port = 3000;

// Parse JSON bodies
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Serve static files in webbserver
app.use(express.static("public"));

// Import routes
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const gameRoutes = require("./routes/gameRoutes")

// Create route
app.get("/users", async (req, res) => {
  let sql = "SELECT * FROM users";
  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
      if (error) {
        if (error) throw error;
      }
      res.json(results);
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

// Use routes in express app
app.use(bookRoutes);
app.use(categoryRoutes);
app.use(gameRoutes);

// Start express webb
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
