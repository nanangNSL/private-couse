const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const {postUser, checkUserByEmail} = require("../model/userModel")
const registerUser  = async (payload) => {
    try {
        let email = payload?.email;
        let password = payload?.password;
        let salt = process.env.PASS_SALT

        const checkEmailAlready = await checkUserByEmail(email);
        if(checkEmailAlready?.length == 0){
            let pass_encrypt = await bcrypt.hashSync(password, parseInt(salt));
            const response = await postUser({name: payload?.name, email: email, password: pass_encrypt, is_agreement: payload?.is_agreement});
            if(!response) throw new Error("Data Not Found")
            return response
        }else {
            return null
        }
    } catch (error) {
        console.log("auth service:",error)
    }
}

const loginUser = async (payload) => {
    try {
        let email = payload?.email;
        let password = payload?.password;
        const checkEmailAlready = await checkUserByEmail(email);
        if(checkEmailAlready?.length !== 0){
        let checkPassword = await bcrypt.compareSync(password, checkEmailAlready[0].password);
        if(checkPassword){
            let token = jwt.sign({email: email}, process.env.PASS_PRIVATE_KEY, { expiresIn: '1h' })
            return token
        }else {
            return null
        }
        }
    } catch (error) {
        console.log("auth service:",error)
    }
}



module.exports = {registerUser, loginUser}