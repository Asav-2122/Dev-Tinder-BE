const User = require("../models/user.model");
const { userValidationSchema } = require("../utils/validations");
const bcrypt = require("bcrypt");
const handleUserSignUp = async (req, res) => {
  try {
    const validation = userValidationSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        errors:
          validation.error.flatten().fieldErrors ||
          "all the fields are required!",
      });
    }

    //checking if user with same email exits or not

    const isUserAlreadyExists = await User.findOne({
      email: req.body.email,
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        error: "email already in use!",
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 8);

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: hashPassword,
      age: req.body.age,
      email: req.body.email,
      skills: req.body.skills,
      gender: req.body.gender,
      photoUrl: req.body.photoUrl,
    });

    return res.status(201).json({
      message: "User created successfully!",
      data: {
        id: user._id,
        firstName: user.firstName,
      },
    });
  } catch (error) {
    console.log("Error while signUp" + error.message);
    res.status(500).json({
      error:
        "Something went wrong while creating your account, please try again later!",
    });
  }
};

const handleUserSignIn = async (req, res) => {};

module.exports = {
  handleUserSignIn,
  handleUserSignUp,
};
