
const db = require('../connection')

const getUser = async () => {
  try {
    const data = await db.query("SELECT * FROM users ORDER BY userID ASC");
    return data.rows;
  } catch (error) {
    console.log(error)
    return error
  }
};

const postUser  = async (name) => {
    try {
        const data = await db.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [name]);
        return data.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

const editUser = async (id, name) => {
    try {
        const data = await db.query("UPDATE users SET name = $1 WHERE userID = $2 RETURNING *", [name, id]);
        return data.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

const deleteUser = async (id) => {
    try {
        const data = await db.query("DELETE FROM users WHERE userID = $1 RETURNING *", [id]);
        return data.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = { getUser, postUser, editUser, deleteUser }
