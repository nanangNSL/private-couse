const { registerUser, loginUser } = require("../service/authService");
const register = async (req, res) => {
  try {
    console.log(req.body);
    let nama = req.body?.name;
    let email = req.body?.email;
    let password = req.body?.password;
    let is_agreement = req.body?.is_agreement;
    if (!email) {
      return res.send("Email Tidak Boleh Kosong");
    }
    if (!password) {
      return res.send("Password Tidak Boleh Kosong");
    }
    if (!is_agreement) {
      return res.send("Agreement Tidak Boleh Kosong");
    }

    if (email && password && is_agreement) {
      const data = await registerUser({
        name: nama,
        email: email,
        password: password,
        is_agreement: is_agreement,
      });
      console.log(data);
      if (data != null) {
        res.send(data);
      } else {
        res.send(`Email ${email} sudah terdaftar`);
      }
    } else {
      res.send("Data Tidak Boleh Kosong");
    }
  } catch (error) {
    console.error("controller", error);
    res.send(error);
  }
};

const login = async (req, res) => {
  try {
    let email = req.body?.email;
    let password = req.body?.password;
    let conf_password = req.body?.conf_password;
    if (conf_password !== password) {
      return res.send("Password Tidak Sama");
    } else {
      if (email && password) {
        const data = await loginUser({ email: email, password: password });
        if (data != null) {
          res.send(data);
        } else {
          res.send("Email atau Password Salah");
        }
      } else {
        res.send("Data Tidak Boleh Kosong");
      }
    }
  } catch (error) {
    console.error("controller", error);
    res.send(error);
  }
};

module.exports = { register, login };
