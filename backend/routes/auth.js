const express = require('express');
const User = require("../models/User");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const JWT_SECRET = "Hritik@#123";
router.post('/createuser', [body('name', 'Enter a valid name').isLength({ min: 3 }),
body('email').isEmail(),
body('password').isLength({ min: 5 }),

], async (req, res) => {
  let success=false;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ success,errors: result.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success, error: "User with this email already exists " })
    }
    const salt = await bcrypt.genSalt(10);
    const secondpassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secondpassword,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const token = jwt.sign({ data }, JWT_SECRET);
    success=true;
    res.json({ success,token });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

router.post('/login', [

  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),]
  , async (req, res) => {
    let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({success, errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success,error: "Enter valid credentials" })
      }
      const comaparepassword = await bcrypt.compare(password, user.password);
      if (!comaparepassword) {
        return res.status(400).json({ success,error: "Enter valid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        }
      }
      const token = jwt.sign({ data }, JWT_SECRET);
      success=true;
      res.json({success, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal error occured");
    }
  })
// get user request
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(userId);
    const user = await User.findById(userId).select('-password');

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
})

module.exports = router;