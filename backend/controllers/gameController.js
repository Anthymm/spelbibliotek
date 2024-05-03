const connectionMySQL = require("./../connectionMySQL")

exports.getGames = async (req, res) => {
  let sql = "SELECT * FROM Games"
  try {
    await connectionMySQL.query(sql, (error, results, fields) => {
      if (error) {
        if (error) throw error
      }
      res.json(results)
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.getGame = async (req, res) => {
  const { id } = req.params;

  let sql = "SELECT * FROM Games WHERE Game_id = ?"

  try {
    await connectionMySQL.query(sql, [id], (error, results, fields) => {
      if (error) {
        if (error) throw error
      }
      res.json(results)
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.createGame = async (req, res) => {
  const { Title, Release_date, Publisher_id } = req.body

  let sql =
    "INSERT INTO Games (Title, Release_date, Publisher_id) VALUES (?, ?, ?)";
  let params = [Title, Release_date, Publisher_id]

  if (!Title || Title.trim().length < 1) {
    return res.status(400).json({
      success: false,
      error: "Du har inte skrivit in någon titel"
    })
  }

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: "",
        message: `Du har lagt till spelet ${Title} i spelbiblioteket`
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.editGame = async (req, res) => {
  const { Title, Release_date, Publisher_id, Game_id } = req.body

  let sql =
    "UPDATE Games SET Title = ?, Release_date = ?, Publisher_id = ? WHERE Game_id = ?";
  let params = [Title, Release_date, Publisher_id, Game_id]

  try {
    await connectionMySQL.query(sql, params, (error, results, fields) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: "",
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.deleteGame = async (req, res) => {
  const { Game_id } = req.params

  let sql = "DELETE FROM Games WHERE Game_id = ?"

  try {
    await connectionMySQL.query(sql, [Game_id], (error, results, fields) => {
      if (error) {
        if (error) throw error
      }
      return res.status(201).json({
        success: true,
        error: "",
        message: "Spelet har blivit borttaget"
      })
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
