
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

const postUser  = async (data) => {
    try {
        const response = await db.query("INSERT INTO users (name, email, password, is_agreement) VALUES ($1, $2, $3, $4) RETURNING *", [data.name, data.email, data.password, data.is_agreement]);
        return response.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

const editUser = async (data, id) => {
    try {
        const data = await db.query("UPDATE users SET name = $1 email= $2 password = $3 WHERE userID = $4 RETURNING *", [data.name, data.email, data.password, id]);
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

const checkUserByEmail = async (email) => {
    try {
        const data = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        return data.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = { getUser, postUser, editUser, deleteUser, checkUserByEmail }
